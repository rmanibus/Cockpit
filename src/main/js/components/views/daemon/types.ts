export interface DaemonProps {
    dockerId: string;
}

export interface ServiceProps extends DaemonProps {
  serviceId: string;
}