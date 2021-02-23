import React from 'react';
import { useRouter } from 'next/router';
import yaml from 'js-yaml';
import { DockerStack } from '../../../types/DockerStack';
import { ServiceEditor } from '../../../components/editors/ServiceEditor';
import api from '../../../api';

const Stack: React.FC = () => {
  const router = useRouter();
  const { stackId } = router.query;

  const [stack, setStack] = React.useState<DockerStack | null>(null);

  const updateService = (name) => (service) => {
    const newServices = { ...stack.services, [name]: service };
    const newStack = { ...stack, services: newServices };
    setStack(newStack);
  };

  console.log(stackId);
  
  React.useEffect(() => {
    if(!stackId){
        return;
    }
    api.get('stacks/' + stackId + '/compose').then((res) => {
      try {
        const parsed = yaml.load(res.data);
        setStack(parsed);
        console.log(parsed);
      } catch (e) {
        console.log(e);
      }
    });
  }, [stackId]);

  return (
    <>
      {stack &&
        Object.entries(stack.services).map(([key, value]) => {
          return <ServiceEditor update={updateService(key)} name={key} service={value} />;
        })}
    </>
  );
};
export default Stack;
