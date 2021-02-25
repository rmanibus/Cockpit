import React from "react";

import { Switch } from "antd";
import { StackContext, StackContextValue } from '../../contexts/StackContext';
import { DockerNetworkDef} from '../../types/DockerStack';
import { SimpleEditorContainer } from './SimpleEditorContainer';
import { SimpleEditor } from './SimpleEditor';
import { SwitchEditor } from './SwitchEditor';
import { useRouter } from 'next/router';

export const NetworkEditor: React.FC = () => {
  const [network, setNetwork] = React.useState<DockerNetworkDef>(null);
  const { stack, stackId, networkId, update } = React.useContext<StackContextValue>(StackContext);
  const router = useRouter();

  const renameNetwork = (newNetworkId) => {
    router.push('/stacks/' + stackId + '/networks/' + newNetworkId);
    update('networks')({ [newNetworkId]: network }, { [networkId]: null });
  };

  const updateNetwork = (added, removed = null) => {
    update("networks")({ [networkId]: added }, removed && { [networkId]: removed })
  };
  const updateField = (fieldName: string) => (added, removed = null) => {
    updateNetwork({[fieldName]: added}, removed && {[fieldName]: removed});
  }

  React.useEffect(()=>{
    setNetwork(stack.networks[networkId]);
  }, [stack]);

  return (
    network && <> {
      <SimpleEditorContainer>
        <SimpleEditor name="Name" value={networkId} onChange={renameNetwork} />
        <SimpleEditor name="Driver" value={network.driver} onChange={updateField('driver')} />
        <SwitchEditor name="Attachable" value={network.attachable} onChange={updateField('attachable')} />
        <SwitchEditor name="Internal" value={network.internal} onChange={updateField('internal')} /> 
      </SimpleEditorContainer>
    }


    </>
  );
};
