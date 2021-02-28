import React from 'react';
import {StackContextProvider, StackContext, StackContextValue} from 'contexts/StackContext';
import {DataContextProvider} from 'contexts/DataContext';
import {render, cleanup} from '@testing-library/react';
import { useRouter } from 'next/router';
import api from 'api';

jest.mock('api');
jest.mock('next/router');

test('test if jest is working', () => {

    useRouter.mockReturnValue({
        query: 
            {stackId: '7f000101-77de-1e01-8177-dede9ef00000', 
            serviceId: 'traefik', 
            networkId: undefined}
    });
    
    api.get.mockResolvedValue({

    });
    //api.get('stacks/' + stackId + '/compose')
    
    const Consumer: React.FC = () => {
        const { stack } = React.useContext<StackContextValue>(StackContext);
        console.log(stack);
        return <></>
    }
    render(
    <DataContextProvider>
        <StackContextProvider>
            <Consumer/>
        </StackContextProvider>
    </DataContextProvider>);
    expect(3).toBe(3);
});


const stackmock = {

    "version": "3.9",
    "services": {
      "traefik": {
        "image": "traefik:latest",
        "networks": [
          "frontend"
        ],
        "ports": [
          "80:80",
          "443:443"
        ],
        "configs": [
          {
            "source": "traefik",
            "target": "/etc/traefik/traefik.yml"
          },
          {
            "source": "traefik_api",
            "target": "/etc/traefik/dynamic/traefik-api.yml"
          }
        ],
        "volumes": [
          "/var/run/docker.sock:/var/run/docker.sock",
          "sciam_traefik-storage:/opt/traefik"
        ],
        "deploy": {
          "replicas": 1,
          "restart_policy": {
            "condition": "on-failure"
          }
        },
        "user": "root"
      },
      "traefikauth": {
        "networks": [
          "frontend"
        ],
        "image": "thomseddon/traefik-forward-auth:2",
        "environment": [
          "DEFAULT_PROVIDER=oidc",
          "PROVIDERS_OIDC_ISSUER_URL=https://url",
          "PROVIDERS_OIDC_CLIENT_ID=clientId",
          "PROVIDERS_OIDC_CLIENT_SECRET=secret",
          "INSECURE_COOKIE=true",
          "SECRET=random",
          "LOG_LEVEL=info"
        ],
        "labels": [
          "traefik.http.services.traefikauth.loadbalancer.server.port=4181",
          "traefik.http.routers.traefikauth.rule=Host(`traefikauth.sciam.fr`)",
          "traefik.http.routers.traefikauth.entrypoints=web_secure",
          "traefik.http.routers.traefikauth.tls=true",
          "traefik.http.routers.traefikauth.tls.certresolver=sslresolver",
          "traefik.enable=true"
        ],
        "deploy": {
          "replicas": 1,
          "restart_policy": {
            "condition": "on-failure"
          }
        }
      },
      "grafana": {
        "image": "grafana/grafana:latest",
        "networks": [
          "frontend",
          "monitoring"
        ],
        "environment": {
          "GF_DEFAULT_INSTANCE_NAME": "SCIAM",
          "GF_SERVER_ROOT_URL": "https://url",
          "GF_AUTH_AZUREAD_NAME": "Azure AD",
          "GF_AUTH_AZUREAD_ENABLED": "true",
          "GF_AUTH_AZUREAD_ALLOW_SIGN_UP": "true",
          "GF_AUTH_AZUREAD_CLIENT_ID": "clientId",
          "GF_AUTH_AZUREAD_CLIENT_SECRET__FILE": "/run/secrets/file",
          "GF_AUTH_AZUREAD_SCOPES": "openid email profile",
          "GF_AUTH_AZUREAD_AUTH_URL": "https://url",
          "GF_AUTH_AZUREAD_TOKEN_URL": "https://token",
          "GF_SECURITY_ADMIN_PASSWORD__FILE": "/run/secrets/file"
        },
        "secrets": [
          "grafana_admin_password",
          "grafana_oauth_secret"
        ],
        "volumes": [
          "grafana-storage:/var/lib/grafana"
        ],
        "labels": {
          "traefik.docker.network": "sciam_frontend",
          "traefik.http.routers.grafana.rule": "Host(`monitoring.sciam.fr`)",
          "traefik.http.routers.grafana.entrypoints": "web_secure",
          "traefik.http.routers.grafana.tls": true,
          "traefik.http.routers.grafana.tls.certresolver": "sslresolver",
          "traefik.http.services.grafana.loadbalancer.server.port": 3000,
          "traefik.enable": true
        },
        "deploy": {
          "replicas": 1,
          "restart_policy": {
            "condition": "on-failure"
          }
        }
      },
      "prometheus": {
        "image": "prom/prometheus",
        "user": "root",
        "networks": {
          "monitoring": {
            "aliases": [
              "prometheus"
            ]
          }
        },
        "volumes": [
          "/var/run/docker.sock:/var/run/docker.sock"
        ],
        "configs": [
          {
            "source": "prometheus",
            "target": "/etc/prometheus/prometheus.yml"
          }
        ],
        "deploy": {
          "replicas": 1,
          "restart_policy": {
            "condition": "on-failure"
          }
        }
      },
      "cadvisor": {
        "image": "google/cadvisor",
        "networks": {
          "monitoring": {
            "aliases": [
              "cadvisor"
            ]
          }
        },
        "volumes": [
          "/:/rootfs:ro",
          "/var/run:/var/run:ro",
          "/sys:/sys:ro",
          "/var/lib/docker/:/var/lib/docker:ro",
          "/dev/disk/:/dev/disk:ro"
        ],
        "deploy": {
          "replicas": 1,
          "restart_policy": {
            "condition": "on-failure"
          }
        }
      },
      "node-exporter": {
        "image": "quay.io/prometheus/node-exporter",
        "networks": {
          "monitoring": {
            "aliases": [
              "node-exporter"
            ]
          }
        },
        "environment": [
          "NODE_ID={{ .Node.ID }}",
          "NODE_NAME={{ .Node.Hostname }}"
        ],
        "volumes": [
          "/proc:/host/proc:ro",
          "/sys:/host/sys:ro",
          "/:/rootfs:ro"
        ],
        "configs": [
          {
            "source": "node_meta",
            "target": "/etc/node-exporter/node-meta.prom"
          }
        ],
        "command": [
          "--path.sysfs=/host/sys",
          "--path.procfs=/host/proc",
          "--collector.textfile.directory=/etc/node-exporter/",
          "--collector.filesystem.ignored-mount-points=^/(sys|proc|dev|host|etc)($$|/)",
          "--no-collector.ipvs"
        ],
        "deploy": {
          "replicas": 1,
          "restart_policy": {
            "condition": "on-failure"
          }
        }
      },
      "gitlab": {
        "image": "gitlab/gitlab-ce:latest",
        "hostname": "git.sciam.fr",
        "networks": [
          "frontend"
        ],
        "environment": {
          "GITLAB_OMNIBUS_CONFIG": "from_file('/omnibus_config.rb')"
        },
        "configs": [
          {
            "source": "gitlab",
            "target": "/omnibus_config.rb"
          }
        ],
        "secrets": [
          "gitlab_oauth_secret",
          "gitlab_root_password"
        ],
        "ports": [
          "2222:22"
        ],
        "labels": [
          "traefik.docker.network=sciam_frontend",
          "traefik.http.routers.gitlab.rule=Host(`git.sciam.fr`)",
          "traefik.http.routers.gitlab.entrypoints=web_secure",
          "traefik.http.routers.gitlab.tls=true",
          "traefik.http.routers.gitlab.tls.certresolver=sslresolver",
          "traefik.http.services.gitlab.loadbalancer.server.port=80",
          "traefik.enable=true"
        ],
        "volumes": [
          "/opt/gitlab/config:/etc/gitlab",
          "/opt/gitlab/logs:/var/log/gitlab",
          "/opt/gitlab/data:/var/opt/gitlab"
        ],
        "deploy": {
          "replicas": 1,
          "restart_policy": {
            "condition": "on-failure"
          }
        }
      },
      "gitlab-runner": {
        "image": "gitlab/gitlab-runner:latest",
        "volumes": [
          "/var/run/docker.sock:/var/run/docker.sock",
          "/opt/gitlab-runner/config:/etc/gitlab-runner"
        ]
      }
    },
    "configs": {
      "traefik": {
        "file": "./config/traefik.yml"
      },
      "traefik_api": {
        "file": "./config/traefik-api.yml"
      },
      "gitlab": {
        "file": "./config/gitlab.rb"
      },
      "prometheus": {
        "file": "./config/prometheus.yml"
      },
      "node_meta": {
        "template_driver": "golang",
        "file": "./config/node-meta.prom.tmpl"
      }
    },
    "secrets": {
      "grafana_admin_password": {
        "file": "./secrets/secret"
      },
      "grafana_oauth_secret": {
        "file": "./secrets/secret"
      },
      "gitlab_oauth_secret": {
        "file": "./secrets/secret"
      },
      "gitlab_root_password": {
        "file": "./secrets/secret"
      }
    },
    "networks": {
      "frontend": {
        "driver": "overlay",
        "attachable": true
      },
      "monitoring": {
        "driver": "overlay",
        "attachable": true,
        "internal": true
      }
    },
    "volumes": {
      "grafana-storage": null,
      "sciam_traefik-storage": null
    }
  }