import React from 'react';
import { useRouter } from 'next/router';
import yaml from 'js-yaml';
import { DockerStack } from '../../../types/DockerStack';
import { StackView } from '../../../components/views/StackView';
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

  return (
    <>
      {stack && <StackView stackId={stackId} stack={stack} />}
    </>
  );
};
export default Stack;
