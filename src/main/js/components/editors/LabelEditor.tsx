import React from 'react';
import { ListProps, ListOrDictEditor } from './ListOrDictEditor';
import { Labels } from '../../types/DockerStack';
import { Row, Col, Card } from 'antd';
import { SimpleEditor } from './SimpleEditor';
import { SwitchEditor } from './SwitchEditor';
import { SimpleEditorCardContainer } from './SimpleEditorContainer';
import { SelectEditor } from './SelectEditor';
import { ListEditor } from './ListEditor';
import { StackContext, StackContextValue } from 'contexts/StackContext';

export const LabelsEditor: React.FC<ListProps<Labels>> = ({ list, update }) => {
  const { stack } = React.useContext<StackContextValue>(StackContext);

  return (
    <>
      <Row gutter={16}>
        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 8}} >
          <Card title="Traefik" bordered={true}>
            <SimpleEditorCardContainer >
              <SwitchEditor name="Enabled" value={true} onChange={() => {}} />
              <SelectEditor name="Network" value={''} onChange={() => {}} choices={Object.keys(stack.networks)} />
              <SimpleEditor name="Port" value={''} onChange={() => {}} />
              <SimpleEditor name="Rule" value={''} onChange={() => {}} />
              <ListEditor name="Entrypoints" value={''} update={() => {}} />
            </SimpleEditorCardContainer>
          </Card>
        </Col>
        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 8}} >
          <Card title="Plugin 2" bordered={false}></Card>
        </Col>
        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 8}} >
          <Card title="Plugin 3" bordered={false}></Card>
        </Col>
      </Row>
      <ListOrDictEditor name="labels" list={list} update={update} />
    </>
  );
};
