import React from 'react';
import yaml from 'js-yaml';
import { DockerStack } from '../types/DockerStack';
import { ServiceEditor } from '../components/ServiceEditor';
const dockerCompose = `
version: "3.9"  # optional since v1.27.0
services:
  traefik:
    image: 'traefik:latest'
    networks:
      - frontend
    ports:
      - '80:80'
      - '443:443'
    configs:
      - source: traefik
        target: /etc/traefik/traefik.yml
      - source: traefik_api
        target: /etc/traefik/dynamic/traefik-api.yml
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock'
      - 'sciam_traefik-storage:/opt/traefik'
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

  traefikauth:
    networks:
      - frontend
    image: thomseddon/traefik-forward-auth:2
    environment:
      - DEFAULT_PROVIDER=oidc
      - PROVIDERS_OIDC_ISSUER_URL=https://login.microsoftonline.com/617b71ad-a8aa-4c91-b68b-f3b3a1d28a92/v2.0
      - PROVIDERS_OIDC_CLIENT_ID=822b612d-b987-4634-90d9-a8f0c4945729
      - PROVIDERS_OIDC_CLIENT_SECRET=secret
      - INSECURE_COOKIE=true # Example assumes no https, do not use in production
      - SECRET=random
      - LOG_LEVEL=info
    labels:
      - traefik.http.services.traefikauth.loadbalancer.server.port=4181
      - traefik.http.routers.traefikauth.rule=Host(\`traefikauth.sciam.fr\`)
      - traefik.http.routers.traefikauth.entrypoints=web_secure
      - traefik.http.routers.traefikauth.tls=true
      - traefik.http.routers.traefikauth.tls.certresolver=sslresolver
      - traefik.enable=true
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

  grafana:
    image: 'grafana/grafana:latest'
    networks:
      - frontend
      - monitoring
    environment:
      GF_DEFAULT_INSTANCE_NAME: "SCIAM"
      GF_SERVER_ROOT_URL: "https://monitoring.sciam.fr"
      GF_AUTH_AZUREAD_NAME: "Azure AD"
      GF_AUTH_AZUREAD_ENABLED: "true"
      GF_AUTH_AZUREAD_ALLOW_SIGN_UP: "true"
      GF_AUTH_AZUREAD_CLIENT_ID: "bd7b791c-5929-4b0c-b107-1d4883739815"
      GF_AUTH_AZUREAD_CLIENT_SECRET__FILE: "/run/secrets/grafana_oauth_secret"
      GF_AUTH_AZUREAD_SCOPES: "openid email profile"
      GF_AUTH_AZUREAD_AUTH_URL: https://login.microsoftonline.com/617b71ad-a8aa-4c91-b68b-f3b3a1d28a92/oauth2/v2.0/authorize
      GF_AUTH_AZUREAD_TOKEN_URL: https://login.microsoftonline.com/617b71ad-a8aa-4c91-b68b-f3b3a1d28a92/oauth2/v2.0/token
      GF_SECURITY_ADMIN_PASSWORD__FILE: "/run/secrets/grafana_admin_password"
    secrets:
      - grafana_admin_password
      - grafana_oauth_secret
    volumes:
      - grafana-storage:/var/lib/grafana
    labels:
      traefik.docker.network: sciam_frontend
      traefik.http.routers.grafana.rule: Host(\`monitoring.sciam.fr\`)
      traefik.http.routers.grafana.entrypoints: web_secure
      traefik.http.routers.grafana.tls: true
      traefik.http.routers.grafana.tls.certresolver: sslresolver
      traefik.http.services.grafana.loadbalancer.server.port: 3000
      traefik.enable: true
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

  prometheus:
    image: 'prom/prometheus'
    user: root
    networks:
      monitoring:
        aliases:
          - prometheus
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock'
    configs:
      - source: prometheus
        target: /etc/prometheus/prometheus.yml
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

  cadvisor:
    image: 'google/cadvisor'
    networks:
      monitoring:
        aliases:
          - cadvisor
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
      - /dev/disk/:/dev/disk:ro
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

  node-exporter:
    image: quay.io/prometheus/node-exporter
    networks:
      monitoring:
        aliases:
          - node-exporter
    environment:
      - NODE_ID={{ .Node.ID }}
      - NODE_NAME={{ .Node.Hostname }}
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    configs:
      - source: node_meta
        target: /etc/node-exporter/node-meta.prom
    command:
      - '--path.sysfs=/host/sys'
      - '--path.procfs=/host/proc'
      - '--collector.textfile.directory=/etc/node-exporter/'
      - '--collector.filesystem.ignored-mount-points=^/(sys|proc|dev|host|etc)($$|/)'
      - '--no-collector.ipvs'
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

  gitlab:
    image: 'gitlab/gitlab-ce:latest'
    hostname: 'git.sciam.fr'
    networks:
      - frontend
    environment:
      GITLAB_OMNIBUS_CONFIG: "from_file('/omnibus_config.rb')"
    configs:
      - source: gitlab
        target: /omnibus_config.rb
    secrets:
      - gitlab_oauth_secret
      - gitlab_root_password
    ports:
      - '2222:22'
    labels:
      - traefik.docker.network=sciam_frontend
      - traefik.http.routers.gitlab.rule=Host(\`git.sciam.fr\`)
      - traefik.http.routers.gitlab.entrypoints=web_secure
      - traefik.http.routers.gitlab.tls=true
      - traefik.http.routers.gitlab.tls.certresolver=sslresolver
      - traefik.http.services.gitlab.loadbalancer.server.port=80
      - traefik.enable=true
    volumes:
      - '/opt/gitlab/config:/etc/gitlab'
      - '/opt/gitlab/logs:/var/log/gitlab'
      - '/opt/gitlab/data:/var/opt/gitlab'
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

  gitlab-runner:
    image: 'gitlab/gitlab-runner:latest'
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock'
      - '/opt/gitlab-runner/config:/etc/gitlab-runner'

configs:
  traefik:
    file: ./config/traefik.yml
  traefik_api:
    file: ./config/traefik-api.yml
  gitlab:
    file: ./config/gitlab.rb
  prometheus:
    file: ./config/prometheus.yml
  node_meta:
    template_driver: golang
    file: ./config/node-meta.prom.tmpl
secrets:
  grafana_admin_password:
    file: ./secrets/grafana_admin_password
  grafana_oauth_secret:
    file: ./secrets/grafana_oauth_secret
  gitlab_oauth_secret:
    file: ./secrets/gitlab_oauth_secret
  gitlab_root_password:
    file: ./secrets/gitlab_root_password
networks:
  frontend:
    driver: overlay
    attachable: true
  monitoring:
    driver: overlay
    attachable: true
    internal: true
volumes:
  grafana-storage:
  sciam_traefik-storage:
`;

const Edit: React.FC = () => {
  const [stack, setStack] = React.useState<DockerStack | null>(null);

  const updateService = (name) => (service) => {
    const newServices = {...stack.services, [name]: service };
    const newStack = {...stack, services: newServices};
    setStack(newStack);
  }

  React.useEffect(() => {
    try {
      const parsed = yaml.load(dockerCompose);
      setStack(parsed);
      console.log(parsed);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div>
      {stack &&
        Object.entries(stack.services).map(([key, value]) => {
          return <ServiceEditor update={updateService(key)} name={key} service={value} />;
        })}
    </div>
  );
};

export default Edit;
