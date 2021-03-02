import React from "react";
import { StackContext, StackContextValue } from 'contexts/StackContext';
import { DockerSecretDef} from 'types/DockerStack';
import { SimpleEditorContainer } from './SimpleEditorContainer';
import { SimpleEditor } from './SimpleEditor';
import { SwitchEditor } from './SwitchEditor';
import { SelectEditor } from './SelectEditor';

import { useRouter } from 'next/router';
import api from 'api';
import { message } from "antd";

export const SecretEditor: React.FC = () => {
  const [secret, setSecret] = React.useState<DockerSecretDef>(null);
  const [externalSecrets, setExternalSecrets] = React.useState([]);
  const { stack, stackId, secretId, update, dockerId } = React.useContext<StackContextValue>(StackContext);
  const router = useRouter();

  const renameSecret = (newSecretId) => {
    router.push('/stacks/' + stackId + '/configs/' + newSecretId);
    update('secrets')({ [newSecretId]: secret }, { [secretId]: null });
  };

  const updateSecret = (added, removed = null) => {
    update("secrets")({ [secretId]: added }, removed && { [secretId]: removed })
  };
  const updateField = (fieldName: string) => (added, removed = null) => {
    updateSecret({[fieldName]: added}, removed && {[fieldName]: removed});
  }

  React.useEffect(()=>{
    setSecret(stack.secrets[secretId]);
  }, [stack]);

  React.useEffect(() => {
    if(!dockerId){
      return;
    }
    api.get('daemon/' + dockerId + "/secrets")
    .then(res => {
      setExternalSecrets(res.data);
    })
    .catch(() => {
      message.error('failed to fetch external secrets !');
    });
  },[api, dockerId]);

  return (
    <> {
      secret && 
      <SimpleEditorContainer>
        <SimpleEditor name="Name" value={secretId} onChange={renameSecret} />
        { !secret.external && <SimpleEditor name="File" value={secret.file} onChange={updateField('file')} />}
        {  secret.external && ! dockerId && <SimpleEditor name="External Name" value={secret.name} onChange={updateField('name')} />}
        {  secret.external &&   dockerId && <SelectEditor choices={externalSecrets.map(secret => secret.Spec.Name)} name="External Name" value={secret.name} onChange={updateField('name')} />}
        <SwitchEditor name="External" value={secret.external} onChange={updateField('external')} /> 
      </SimpleEditorContainer>
    }
    </>
  );
};
