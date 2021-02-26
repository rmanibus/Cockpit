import React from 'react';
import { ListProps, ListOrDictEditor } from './ListOrDictEditor';
import { Labels } from '../../types/DockerStack';
import { Row, Col, Card } from 'antd';
import { SimpleEditor } from './SimpleEditor';
import { SimpleEditorContainer } from './SimpleEditorContainer';
import { SelectEditor } from './SelectEditor';
import { StackContext, StackContextValue } from '../../contexts/StackContext';

export const LabelsEditor: React.FC<ListProps<Labels>> = ({ list, update }) => {

  const { stack } = React.useContext<StackContextValue>(StackContext);


  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Traefik" bordered={false}>
          <SimpleEditorContainer>
          
            <SelectEditor name="network" value={""} onChange={() => {}} choices={Object.keys(stack.networks)} />

            <SimpleEditor name="network" value={""} onChange={(value) => {}} />
          </SimpleEditorContainer>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Plugin 2" bordered={false}></Card>
        </Col>
        <Col span={8}>
          <Card title="Plugin 3" bordered={false}></Card>
        </Col>
      </Row>
      <ListOrDictEditor name="labels" list={list} update={update} />
    </>
  );
};
