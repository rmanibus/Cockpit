import React from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Divider } from 'antd';
import { StackContext, StackContextValue } from '../../contexts/StackContext';
import { LabelsEditor } from './LabelEditor';
import { EnvironmentEditor } from './EnvironmentEditor';
import { DockerService } from '../../types/DockerStack';
import { SimpleEditor } from './SimpleEditor';
import { ListEditor } from './ListEditor';
import { MultiSelectEditor } from './MultiSelectEditor';
import { SimpleEditorContainer } from './SimpleEditorContainer';

export const ServiceEditor: React.FC = () => {
  const router = useRouter();
  const [service, setService] = React.useState<DockerService>(null);
  const { stack, stackId, serviceId, update } = React.useContext<StackContextValue>(StackContext);

  const renameService = (newServiceId) => {
    router.push('/stacks/' + stackId + '/services/' + newServiceId);
    update('services')({ [newServiceId]: service }, { [serviceId]: null });
  };

  const updateService = (added, removed = null) => {
    update('services')({ [serviceId]: added }, removed && { [serviceId]: removed });
  };
  const updateField = (fieldName: string) => (added, removed = null) => {
    updateService({ [fieldName]: added }, removed && { [fieldName]: removed });
  };
  const updateBuildField = (fieldName: string) => (added, removed = null) => {
    updateField('build')({ [fieldName]: added }, removed && { [fieldName]: removed });
  };
  React.useEffect(() => {
    setService(stack.services[serviceId]);
  }, [stack, serviceId]);
  return (
    <>
      {service && (
        <>
          <h2>General</h2>
          <SimpleEditorContainer>
            <SimpleEditor name="name" value={serviceId} onChange={renameService} />
            <SimpleEditor name="image" value={service.image && service.image.split(':')[0]} />
            <SimpleEditor name="tag" value={(service.image && service.image.split(':')[1]) || 'latest'} />
            <SimpleEditor name="user" value={service.user} onChange={updateField('user')} />
            <ListEditor name="command" value={service.command} update={updateField('command')} />
            <ListEditor name="entrypoint" value={service.entrypoint} update={updateField('entrypoint')} />
            <ListEditor name="dns" value={service.dns} update={updateField('dns')} />
            <ListEditor name="dns search" value={service.dns_search} update={updateField('dns_search')} />
            <MultiSelectEditor name="Depends on" list={service.depends_on} onChange={updateField('depends_on')} choices={Object.keys(stack.services)} />
          </SimpleEditorContainer>
          <Divider />
          <h2>Build</h2>
          <Row justify="end">
            <Col span={23}>
              <SimpleEditorContainer>
                <SimpleEditor name="Context" value={service.build && service.build.context} onChange={updateBuildField('context')} />
                <SimpleEditor name="Dockerfile" value={service.build && service.build.dockerfile} onChange={updateBuildField('dockerfile')} />
              </SimpleEditorContainer>
            </Col>
          </Row>
          <Divider />
          <LabelsEditor list={service.labels} update={updateField('labels')} />
          <Divider />
          <EnvironmentEditor list={service.environment} update={updateField('environment')} />
          <Divider />
        </>
      )}
    </>
  );
};

