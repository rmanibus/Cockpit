import React from 'react';
import { useRouter } from 'next/router';
import { Input, Row, Col, Divider, Select, Descriptions } from 'antd';
import { StackContext, StackContextValue } from '../../contexts/StackContext';
import { LabelsEditor } from './LabelEditor';
import { EnvironmentEditor } from './EnvironmentEditor';
import { DockerService } from '../../types/DockerStack';

const { Option } = Select;

export const ServiceEditor: React.FC = () => {
  const router = useRouter();
  const [service, setService] = React.useState<DockerService>(null);
  const { stack, stackId, serviceId, update } = React.useContext<StackContextValue>(StackContext);

  const renameService = (newServiceId) => {
    router.push('/stacks/' + stackId + '/services/' + newServiceId);
    update('services')({ [newServiceId]: service}, { [serviceId]: null });
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
  const eventAdapter = (fun) => {
    return (e) => fun(e.target.value);
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
            <Input placeholder="name" value={serviceId} onChange={eventAdapter(renameService)} />
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Image">
            <Input placeholder="image" value={service.image && service.image.split(':')[0]} />
          </Descriptions.Item>
          <Descriptions.Item label="Tag">
            <Input placeholder="tag" value={service.image && service.image.split(':')[1] || 'latest'} />
          </Descriptions.Item>
          <Descriptions.Item label="User">
            <Input placeholder="user" value={service.user} onChange={eventAdapter(updateField('user'))} />
          </Descriptions.Item>
          <Descriptions.Item label="Depends On">
            <Select placeholder="depends on" mode="multiple" allowClear style={{ width: '100%' }}>
              {Object.keys(stack.services).map((service) => (
                <Option value={service}>{service}</Option>
              ))}
            </Select>
          </Descriptions.Item>
        </Descriptions>

        <Divider />
        <h2>Build</h2>
        <Row justify="end">
          <Col span={23}>
          <Descriptions layout="horizontal" bordered>
          <Descriptions.Item label="Context">
            <Input placeholder="context" value={service.build && service.build.context} onChange={eventAdapter(updateBuildField('context'))} />
          </Descriptions.Item>
          <Descriptions.Item label="Dockerfile">
          <Input
              placeholder="dockerfile"
              value={service.build && service.build.dockerfile}
              onChange={eventAdapter(updateBuildField('dockerfile'))}
            />
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
