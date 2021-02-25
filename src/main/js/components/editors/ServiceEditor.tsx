import React from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Divider, Select, Descriptions, Button } from 'antd';
import { StackContext, StackContextValue } from '../../contexts/StackContext';
import { LabelsEditor } from './LabelEditor';
import { EnvironmentEditor } from './EnvironmentEditor';
import { DockerService } from '../../types/DockerStack';
import { SimpleEditor } from './SimpleEditor';
import { ListEditor } from './ListEditor';
import { SelectEditor } from './SelectEditor';
const { Option } = Select;

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
          <Descriptions layout="horizontal" bordered>
            <Descriptions.Item span={3} label="Name">
              <SimpleEditor name="name" value={serviceId} onChange={renameService} />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="Image">
              <SimpleEditor name="image" value={service.image && service.image.split(':')[0]} />
            </Descriptions.Item>
            <Descriptions.Item span={1} label="Tag">
              <SimpleEditor name="tag" value={(service.image && service.image.split(':')[1]) || 'latest'} />
            </Descriptions.Item>
            <Descriptions.Item span={3} label="User">
              <SimpleEditor name="user" value={service.user} onChange={updateField('user')} />
            </Descriptions.Item>
            <Descriptions.Item span={3} label="Command">
              <ListEditor name="command" value={service.command} update={updateField('command')} />
            </Descriptions.Item>
            <Descriptions.Item span={3} label="EntryPoint">
              <ListEditor name="entrypoint" value={service.entrypoint} update={updateField('entrypoint')} />
            </Descriptions.Item>
            <Descriptions.Item span={3} label="Dns">
              <SimpleEditor name="dns" value={service.dns} onChange={updateField('dns')} />
            </Descriptions.Item>
            <Descriptions.Item span={3} label="Dns Search">
              <SimpleEditor name="dns search" value={service.dns_search} onChange={updateField('dns_search')} />
            </Descriptions.Item>
            <Descriptions.Item span={3} label="Depends On">
            <SelectEditor name="Depends on" list={service.depends_on} onChange={updateField('depends_on')} choices={Object.keys(stack.services)} />
            </Descriptions.Item>
          </Descriptions>

          <Divider />
          <h2>Build</h2>
          <Row justify="end">
            <Col span={23}>
              <Descriptions layout="horizontal" bordered>
                <Descriptions.Item span={3} label="Context">
                  <SimpleEditor name="context" value={service.build && service.build.context} onChange={updateBuildField('context')} />
                </Descriptions.Item>
                <Descriptions.Item span={3} label="Dockerfile">
                  <SimpleEditor name="dockerfile" value={service.build && service.build.dockerfile} onChange={updateBuildField('dockerfile')} />
                </Descriptions.Item>
              </Descriptions>
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