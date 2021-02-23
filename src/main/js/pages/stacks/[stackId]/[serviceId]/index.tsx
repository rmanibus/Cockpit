import React from 'react';
import { useRouter } from 'next/router';
import yaml from 'js-yaml';
import { DockerStack } from '../../../../types/DockerStack';
import { ServiceEditor } from '../../../../components/editors/ServiceEditor';
import api from '../../../../api';

const Service: React.FC = () => {
    const router = useRouter();
    const { stackId, serviceId } = router.query;
  
    const [stack, setStack] = React.useState<DockerStack | null>(null);
  
    const updateService = (service) => {
      const newServices = { ...stack.services, [serviceId]: service };
      const newStack = { ...stack, services: newServices };
      setStack(newStack);
    };
    
    React.useEffect(() => {
      if(!stackId){
          return;
      }
      api.get('stacks/' + stackId + '/compose').then((res) => {
        try {
          const parsed = yaml.load(res.data);
          setStack(parsed);
        } catch (e) {
          console.log(e);
        }
      });
    }, [stackId]);

    return(
        <>
       {stack && <ServiceEditor update={updateService} name={serviceId} service={stack.services[serviceId]} />}
        </>
    );
}
export default Service;