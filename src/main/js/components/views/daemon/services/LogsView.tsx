import React from 'react';
import { ServiceProps } from '../types';

export const LogsView: React.FC<ServiceProps> = ({ dockerId, serviceId }: ServiceProps) => {
  const [ logs, setLogs] = React.useState([]);
  const ref = React.useRef([]);

  React.useEffect(() => {
    if(dockerId && serviceId){
        // rewrites does not work with SSR ...
        const sse = new EventSource('http://localhost:8080/api/daemon/' + dockerId + '/logs/' + serviceId, {withCredentials: false});
        sse.onmessage = event => {
            ref.current = [...ref.current, JSON.parse(event.data)];
            setLogs(ref.current);
        };
        sse.onerror = e => {
            console.log(e);
            sse.close();
        }
        return () =>  {sse.close };
    };
    
  }, [dockerId, serviceId]);

  return (
    <>
    <h2>Logs</h2>
    <div style={{padding: '10px', backgroundColor: 'black', color: 'white', maxHeight: '40vh', overflow: 'auto'}}>
    {logs.map(log => <>{atob(log.payload)} <br/></>)}
    </div>
    </>
  );
};