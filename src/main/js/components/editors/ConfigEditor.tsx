import React from "react";
import { StackContext, StackContextValue } from 'contexts/StackContext';
import { DockerConfigDef} from 'types/DockerStack';
import { SimpleEditorContainer } from './SimpleEditorContainer';
import { SimpleEditor } from './SimpleEditor';
import { SwitchEditor } from './SwitchEditor';
import { SelectEditor } from './SelectEditor';

import { useRouter } from 'next/router';

export const ConfigEditor: React.FC = () => {
  const [config, setConfig] = React.useState<DockerConfigDef>(null);
  const { stack, stackId, configId, update } = React.useContext<StackContextValue>(StackContext);
  const router = useRouter();

  const renameConfig = (newConfigId) => {
    router.push('/stacks/' + stackId + '/configs/' + newConfigId);
    update('configs')({ [newConfigId]: config }, { [configId]: null });
  };

  const updateConfig = (added, removed = null) => {
    update("configs")({ [configId]: added }, removed && { [configId]: removed })
  };
  const updateField = (fieldName: string) => (added, removed = null) => {
    updateConfig({[fieldName]: added}, removed && {[fieldName]: removed});
  }

  React.useEffect(()=>{
    setConfig(stack.configs[configId]);
  }, [stack]);

  return (
    <> {
      config && 
      <SimpleEditorContainer>
        <SimpleEditor name="Name" value={configId} onChange={renameConfig} />
        <SimpleEditor name="File" value={config.file} onChange={updateField('file')} />
        <SwitchEditor name="External" value={config.external} onChange={updateField('external')} /> 
      </SimpleEditorContainer>
    }


    </>
  );
};
