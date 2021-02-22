import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { DataContext } from '../../contexts/DataContext';
import api from '../../api';

const { Option } = Select;

type SourceFormProps = {
  afterFinish: any;
};

export const SourceForm: React.FC<SourceFormProps> = ({ afterFinish }) => {
  const { create } = React.useContext(DataContext);
  const onFinish = (values: any) => {
    create(values)
      .then(afterFinish)
      .then(() => message.success('source created !'))
      .catch(() => message.error('failed to create source !'));
  };

  return (
    <Form initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item name="name" rules={[{ required: true, message: 'Please input source name!' }]}>
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item name="type" rules={[{ required: true, message: 'Please input source type!' }]}>
        <Select placeholder="Please select a type">
          <Option value="GITLAB">Gitlab</Option>
          <Option value="GITHUB">Github</Option>
          <Option value="LOCAL">Local</Option>
        </Select>
      </Form.Item>
      <Form.Item name="location" rules={[{ required: true, message: 'Please input source location!' }]}>
        <Input placeholder="Location" />
      </Form.Item>
      <Form.Item name="secret" rules={[{ required: true, message: 'Please input source secret!' }]}>
        <Input placeholder="Secret" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};
