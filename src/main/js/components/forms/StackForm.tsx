import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { DataContext } from 'contexts/DataContext';
import { sourceTypes, commitModes, deployModes, stackTypes } from 'translations/constants';
import { Stack } from 'types/Stack';
import api from 'api';

const { Option } = Select;

type EditStackFormProps = {
    afterFinish: any;
    id: string;
};

export const EditStackForm: React.FC<EditStackFormProps> = ({ id, afterFinish }) => {
    const { get, data, edit, clearData } = React.useContext(DataContext);

    React.useEffect(() => {
        get(id);
        return clearData;
    }, [id])
    const onFinish = (values: any) => {
        edit(values, id)
        .then(afterFinish)
        .then(() => message.success('stack edited !'))
        .catch((e) => {
          console.log(e) ; 
          message.error('failed to edit stack !')});
    };

    return <StackForm data={data} onFinish={onFinish}/>
}

type CreateStackFormProps = {
    afterFinish: any;
};

  
export const CreateStackForm: React.FC<CreateStackFormProps> = ({ afterFinish }) => {
    const { create } = React.useContext(DataContext);
    const onFinish = (values: any) => {
      create(values)
        .then(afterFinish)
        .then(() => message.success('source created !'))
        .catch(() => message.error('failed to create source !'));
    };
    return <StackForm onFinish={onFinish}/>
}

type StackFormProps = {
    data?: Stack;
    onFinish: any;
};
  
export const StackForm: React.FC<StackFormProps> = ({ data, onFinish }) => {
  let [sources, setSources] = React.useState([]);
  let [form] = Form.useForm();
  React.useEffect(() => {
    api.get('sources')
    .then(res => {
        setSources(res.data);
        form && data && form.setFieldsValue({...data, source: data.source.id});
    });
  },[form, data])
  return (
    <Form form={form} initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item name="name" rules={[{ required: true, message: 'Please input stack name!' }]}>
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item name="source" rules={[{ required: true, message: 'Please input stack source !' }]}>
        <Select placeholder="Please select a source">
            {sources.map((source) => <Option value={source.id}>{React.createElement(sourceTypes[source.type].icon)} {source.name}</Option>)};
        </Select>
      </Form.Item>
      <Form.Item name="type" rules={[{ required: true, message: 'Please input source type!' }]}>
        <Select placeholder="Please select a stack type">
            {Object.keys(stackTypes).map((key) => <Option value={key}>{stackTypes[key].text}</Option>)};
        </Select>
      </Form.Item>
      <Form.Item name="commit_mode" rules={[{ required: true, message: 'Please input source type!' }]}>
        <Select placeholder="Please select a commit mode">
            {Object.keys(commitModes).map((key) => <Option value={key}>{React.createElement(commitModes[key].icon)} {commitModes[key].text}</Option>)};
        </Select>
      </Form.Item>
      <Form.Item name="deploy_mode" rules={[{ required: true, message: 'Please input source type!' }]}>
        <Select placeholder="Please select a deploy mode">
            {Object.keys(deployModes).map((key) => <Option value={key}>{deployModes[key].text}</Option>)};
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
        {data ? 'Edit' : 'Create'} 
        </Button>
      </Form.Item>
    </Form>
  );
};
