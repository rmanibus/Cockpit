import React from 'react';
import { ServiceProps } from '../types';

export const LogsView: React.FC<ServiceProps> = ({ dockerId, serviceId }: ServiceProps) => {
  const [ logs, setLogs] = React.useState("");

  React.useEffect(() => {
    if(dockerId && serviceId){
        const sse = new EventSource('/api/daemon/' + dockerId + '/logs/' + serviceId, {withCredentials: true});
        sse.onmessage = event => {
            console.log(event);
        };
        sse.onerror = e => {
            console.log(e);
            sse.close();
        }
        console.log(sse);
        return () =>  {sse.close };
    };
    
  }, [dockerId, serviceId]);

  return (
    <>
    </>
  );
};