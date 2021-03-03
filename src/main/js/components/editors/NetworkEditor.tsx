import React from "react";
import { StackContext, StackContextValue } from 'contexts/StackContext';
import { DockerNetworkDef} from 'types/DockerStack';
import { SimpleEditorContainer } from './SimpleEditorContainer';
import { SimpleEditor } from './SimpleEditor';
import { SwitchEditor } from './SwitchEditor';
import { SelectEditor } from './SelectEditor';

import { useRouter } from 'next/router';
import { message } from "antd";

import api from 'api';


export const NetworkEditor: React.FC = () => {
  const [network, setNetwork] = React.useState<DockerNetworkDef>(null);
  const [externalNetworks, setExternalNetworks] = React.useState([]);

  const { stack, stackId, networkId, update, dockerId } = React.useContext<StackContextValue>(StackContext);
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

  React.useEffect(() => {
    if(!dockerId){
      return;
    }
    api.get('daemon/' + dockerId + "/networks")
    .then(res => {
      setExternalNetworks(res.data);
    })
    .catch(() => {
      message.error('failed to fetch external networks !');
    })
    ;
  },[api, dockerId]);
  
  return (
    <> {
      network && 
      <SimpleEditorContainer>
        <SimpleEditor name="Name" value={networkId} onChange={renameNetwork} />
        { ! network.external &&<SelectEditor name="Driver" value={network.driver} onChange={updateField('driver')} choices={['overlay', 'bridge']} />}
        { ! network.external &&<SwitchEditor name="Attachable" value={network.attachable} onChange={updateField('attachable')} />}
        { ! network.external && <SwitchEditor name="Internal" value={network.internal} onChange={updateField('internal')} />}
        {  network.external && ! dockerId && <SimpleEditor name="External Name" value={network.name} onChange={updateField('name')} />}
        {  network.external &&   dockerId && <SelectEditor choices={externalNetworks.map(net => net.Name)} name="External Name" value={network.name} onChange={updateField('name')} />}
        <SwitchEditor name="External" value={network.external} onChange={updateField('external')} />
      </SimpleEditorContainer>
    }


    </>
  );
};
