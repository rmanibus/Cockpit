export interface DockerStack {
    services: {
        [key: string]: DockerService
    };
    configs: {
        [key: string]: DockerConfigDef
    };
    networks:{
        [key: string]: DockerNetworkDef
    }
    volumes: {
        [key: string]: DockerVolumeDef
    };

}
export interface DockerService {
    image: string;
    user?: string;
    credential_spec?: {
        config: string;
    }
    depends_on?: Array<String>;
    command?: string | Array<string>;
    entrypoint?: string | Array<string>;
    dns?: string | Array<String>;
    dns_search?: string | Array<String>;
    networks?: { [key: string]: DockerNetwork } | Array<string>;
    environment?: Environment;
    ports?: Array<string | ExposedPort>;
    expose?: Array<string>;
    volumes?: Array<string | Volume>;
    labels?: Labels;
    healthcheck?: {
        test: Array<string>;
        interval: string;
        timeout: string;
        retries: number;
        start_period: string;
    }
    configs: Array<String | Config>;
    logging: {
        driver: string;
        options: {
            [key: string]: string;
        }
    }
    build?: {
        context: string;
        dockerfile: string;
        args?: { [key: string]: string } | Array<string>;
        cache_from?: Array<string>;
        labels?: Labels;
        network?: string;
    }
    cap_add?: Array<string>;
    cap_drop?: Array<string>;
    cgroup_parent?: string;
    deploy?: {
        mode: 'replicated' | 'global';
        placement?: {
            max_replicas_per_node: number;
            constraints: Array<string>
        };
        replicas?: number;
        resources?: {
            limits: {
                cpus: string;
                memory: string;
            };
            reservations: {
                cpus: string;
                memory: string;
            };
        };
        labels: Labels;
        restart_policy?: {
            condition: 'none' | 'on-failure' | 'any';
            delay: string;
            max_attempts: number;
            window: string;
        };
        endpoint_mode?: 'vip' | 'dnsrr';
          
    }

}

export interface Config {
    source: string;
    target: string;
    uid?: string;
    gid?: string;
    mode?: string;
}

export type Environment = EnvironmentDict | EnvironmentArray;
export interface EnvironmentDict {
    [key: string]: string;
}
export interface EnvironmentArray extends Array<String> {};

export type Labels = LabelsDict | LabelsArray;
export interface LabelsDict {
    [key: string]: string;
}

export interface LabelsArray {
    [key: number]: string;
}
export interface Volume {
    type: "volume" | "bind" | "tmpfs" | "npipe";
    source: string
    target: string
    volume: {
        nocopy: boolean
    } 
}
export interface ExposedPort {
    target: number;
    published: number;
    protocol: string;
    mode: 'host' | 'ingress';
}
export interface DockerConfigDef {
    file: string;
    external: boolean;
}
export interface DockerNetwork {
    aliases:  Array<string>;
    ipv4_address?: string;
    ipv6_address?: string;
}
export interface DockerNetworkDef {
    driver: string;
    attachable: boolean;
    internal: boolean;
}
export interface DockerVolumeDef {
}