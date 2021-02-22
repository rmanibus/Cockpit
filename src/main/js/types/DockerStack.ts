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
    networks?: { [key: string]: DockerNetwork } | Array<string>;
    environment?: Environment;
    ports?: Array<string | ExposedPort>;
    volumes?: Array<string | Volume>;
    labels?: Label;
    deploy?: {
        mode: 'replicated' | 'global';
        placement?: {
            constraints: Array<string>
        }
        replicas?: number
        resources?: {
            limits: {
                cpus: string
                memory: string
            };
            reservations: {
                cpus: string
                memory: string
            };
        }
        restart_policy?: {
            condition: 'none' | 'on-failure' | 'any'
        };
          
    }

}

export type Environment = EnvironmentDict | EnvironmentArray;
export interface EnvironmentDict {
    [key: string]: string;
}
export interface EnvironmentArray {
    [key: number]: string;
}
export type Label = LabelDict | LabelArray;
export interface LabelDict {
    [key: string]: string;
}

export interface LabelArray {
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
