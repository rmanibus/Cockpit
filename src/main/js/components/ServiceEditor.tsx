import React from "react";
import { DockerService } from '../types/DockerStack';
import { LabelsEditor } from './LabelEditor';
import { EnvironmentEditor } from './EnvironmentEditor';
import { Input, Row, Col } from "antd";

type ServiceProps = {
  name: string;
  service: DockerService;
  update: any;
};

export const ServiceEditor: React.FC<ServiceProps> = ({ name, service, update }) => {

  const updateField = (name) => (value) => {
    const newService = {...service, [name]: value};
    update(newService);
  }
  const updateFieldFromInput = (name) => (e) => {
      updateField(name)(e.target.value)
  }

  return (
    <>
      <h2>{name}</h2>
      <Input placeholder="name" value={name} />

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
      <LabelsEditor list={service.labels} update={updateField('labels')}/>
      <EnvironmentEditor list={service.environment} update={updateField('environment')} />
    </>
  );
};
