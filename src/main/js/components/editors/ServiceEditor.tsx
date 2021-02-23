import React from "react";

import { Input, Row, Col, Divider, PageHeader } from "antd";
import { StackContext, StackContextValue } from '../../contexts/StackContext';
import { DockerService } from '../../types/DockerStack';
import { LabelsEditor } from './LabelEditor';
import { EnvironmentEditor } from './EnvironmentEditor';


export const ServiceEditor: React.FC = () => {

  const { stack, serviceId, update } = React.useContext<StackContextValue>(StackContext);

  const service = stack.services[serviceId];

  const updateService = (service) => {
    const newServices = { ...stack.services, [serviceId]: service };
    update("services")(newServices)
  };

  const updateField = (fieldName: string) => (value) => {
    const newService = {...stack.services[serviceId], [fieldName]: value};
    updateService(newService);
  }
  const updateFieldFromInput = (fieldName) => (e) => {
      updateField(fieldName)(e.target.value)
  }

  return (
    <>
      <PageHeader title={serviceId} />
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
