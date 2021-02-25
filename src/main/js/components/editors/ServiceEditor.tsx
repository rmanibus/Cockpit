import React from 'react';
import { useRouter } from 'next/router';
import { Form, Row, Col, Divider, Descriptions } from 'antd';
import { StackContext, StackContextValue } from '../../contexts/StackContext';
import { LabelsEditor } from './LabelEditor';
import { EnvironmentEditor } from './EnvironmentEditor';
import { DockerService } from '../../types/DockerStack';
import { SimpleEditor, SimpleEditorProps } from './SimpleEditor';
import { ListEditor } from './ListEditor';
import { SelectEditor } from './SelectEditor';

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
          <SimpleEditoContainer>
            <SimpleEditor name="name" value={serviceId} onChange={renameService} />
            <SimpleEditor name="image" value={service.image && service.image.split(':')[0]} />
            <SimpleEditor name="tag" value={(service.image && service.image.split(':')[1]) || 'latest'} />
            <SimpleEditor name="user" value={service.user} onChange={updateField('user')} />
            <ListEditor name="command" value={service.command} update={updateField('command')} />
            <ListEditor name="entrypoint" value={service.entrypoint} update={updateField('entrypoint')} />
            <ListEditor name="dns" value={service.dns} update={updateField('dns')} />
            <ListEditor name="dns search" value={service.dns_search} update={updateField('dns_search')} />
            <SelectEditor name="Depends on" list={service.depends_on} onChange={updateField('depends_on')} choices={Object.keys(stack.services)} />
          </SimpleEditoContainer>
          <Divider />
          <h2>Build</h2>
          <Row justify="end">
            <Col span={23}>
              <SimpleEditoContainer>
                <SimpleEditor name="Context" value={service.build && service.build.context} onChange={updateBuildField('context')} />
                <SimpleEditor name="Dockerfile" value={service.build && service.build.dockerfile} onChange={updateBuildField('dockerfile')} />
              </SimpleEditoContainer>
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

export const SimpleEditoContainer: React.FC = ({ children }) => {
  return (
    <Form
      labelAlign="left"
      labelCol={{
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 6 },
        lg: { span: 4 },
        xl: { span: 3 },
        style: {
          paddingLeft: '10px',
          backgroundColor: 'rgb(250, 250, 250)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgb(240, 240, 240)',
        },
      }}
      wrapperCol={{
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 18 },
        lg: { span: 20 },
        xl: { span: 21 },
      }}
      layout="horizontal"
    >
      {[].concat(children).map((item) => {
        const { name } = item.props;
        return <SimpleEditorItem name={name}>{item}</SimpleEditorItem>;
      })}
    </Form>
  );
};

type SimpleEditorItemProps = {
  name: string;
};
export const SimpleEditorItem: React.FC<SimpleEditorItemProps> = ({ name, children }) => {
  return (
    <Form.Item label={name} style={{ padding: '5px', marginBottom: '0', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgb(240, 240, 240)' }}>
      {children}
    </Form.Item>
  );
};
