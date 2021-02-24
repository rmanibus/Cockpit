import React from "react";

import { Switch, Input, Row, Col } from "antd";
import { StackContext, StackContextValue } from '../../contexts/StackContext';
import { DockerNetworkDef} from '../../types/DockerStack';

export const NetworkEditor: React.FC = () => {
  const [network, setNetwork] = React.useState<DockerNetworkDef>(null);
  const { stack, networkId, update } = React.useContext<StackContextValue>(StackContext);

  const updateService = (added, removed = null) => {
    update("networks")({ [networkId]: added }, removed && { [networkId]: removed })
  };
  const updateField = (fieldName: string) => (added, removed = null) => {
    updateService({[fieldName]: added}, removed && {[fieldName]: removed});
  }
  const updateFieldFromInput = (fieldName: string) => (e) => {
      updateField(fieldName)(e.target.value)
  }

  React.useEffect(()=>{
    setNetwork(stack.networks[networkId]);
  }, [stack]);

  return (
    network && <>
      <Input placeholder="name" value={networkId} />
      <Input placeholder="driver" value={network.driver} />
      <Switch checked={network.attachable}/> Attachable<br />
      <Switch checked={network.internal} /> Internal

    </>
  );
};
