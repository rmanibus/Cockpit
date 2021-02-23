import React from "react";

import { Input, Row, Col, Divider } from "antd";
import { StackContext, StackContextValue } from '../../contexts/StackContext';
import { LabelsEditor } from './LabelEditor';
import { EnvironmentEditor } from './EnvironmentEditor';


export const ServiceEditor: React.FC = () => {
  const [service, setService] = React.useState(null);
  const { stack, serviceId, update } = React.useContext<StackContextValue>(StackContext);

  const updateService = (added, removed = null) => {
    update("services")({ [serviceId]: added }, removed && { [serviceId]: removed })
  };
  const updateField = (fieldName: string) => (added, removed = null) => {
    updateService({[fieldName]: added}, removed && {[fieldName]: removed});
  }
  const updateFieldFromInput = (fieldName: string) => (e) => {
      updateField(fieldName)(e.target.value)
  }

  React.useEffect(()=>{
    setService(stack.services[serviceId]);
  }, [stack]);

  return (
    service && <>
      <Input placeholder="name" value={serviceId} />
      <Input.Group>
        <Row gutter={8}>
          <Col span={16}>
          <Input placeholder="image" value={service.image.split(':')[0]} />
          </Col>
          <Col span={8}>
          <Input placeholder="tag" value={service.image.split(':')[1] || 'latest'} />
          </Col>
        </Row>
      </Input.Group>
      <Input placeholder="user" value={service.user} onChange={updateFieldFromInput('user')} />
      <Divider />
      <LabelsEditor list={service.labels} update={updateField('labels')}/>
      <Divider />
      <EnvironmentEditor list={service.environment} update={updateField('environment')} />
      <Divider />
    </>
  );
};
