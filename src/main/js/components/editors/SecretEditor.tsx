import React from "react";
import { StackContext, StackContextValue } from 'contexts/StackContext';
import { DockerSecretDef} from 'types/DockerStack';
import { SimpleEditorContainer } from './SimpleEditorContainer';
import { SimpleEditor } from './SimpleEditor';
import { SwitchEditor } from './SwitchEditor';
import { SelectEditor } from './SelectEditor';

import { useRouter } from 'next/router';

export const SecretEditor: React.FC = () => {
  const [secret, setSecret] = React.useState<DockerSecretDef>(null);
  const { stack, stackId, secretId, update } = React.useContext<StackContextValue>(StackContext);
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

  return (
    <> {
      secret && 
      <SimpleEditorContainer>
        <SimpleEditor name="Name" value={secretId} onChange={renameSecret} />
        <SimpleEditor name="File" value={secret.file} onChange={updateField('file')} />
        <SwitchEditor name="External" value={secret.external} onChange={updateField('external')} /> 
      </SimpleEditorContainer>
    }


    </>
  );
};
