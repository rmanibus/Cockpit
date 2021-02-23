import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { DataContext } from '../../contexts/DataContext';
import { sourceTypes } from '../../translations/Source';
import { Source } from '../../types/Source';
const { Option } = Select;

type EditSourceFormProps = {
    afterFinish: any;
    id: string;
};

export const EditSourceForm: React.FC<EditSourceFormProps> = ({ id, afterFinish }) => {
    const { get, data, edit, clearData } = React.useContext(DataContext);

    React.useEffect(() => {
        get(id);
        return clearData;
    }, [id])
    const onFinish = (values: any) => {
        edit(values, id)
        .then(afterFinish)
        .then(() => message.success('source edited !'))
        .catch(() => message.error('failed to edit source !'));
    };

    return <SourceForm data={data} onFinish={onFinish}/>
}

type CreateSourceFormProps = {
    afterFinish: any;
};

  
export const CreateSourceForm: React.FC<CreateSourceFormProps> = ({ afterFinish }) => {
    const { create } = React.useContext(DataContext);
    const onFinish = (values: any) => {
      create(values)
        .then(afterFinish)
        .then(() => message.success('source created !'))
        .catch(() => message.error('failed to create source !'));
    };
    return <SourceForm onFinish={onFinish}/>
}

type SourceFormProps = {
    data?: Source;
    onFinish: any;
};
  
export const SourceForm: React.FC<SourceFormProps> = ({ data, onFinish }) => {

  let [form] = Form.useForm();
  React.useEffect(() => {
    form && data && form.setFieldsValue(data);
  })
  return (
    <Form form={form} initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item name="name" rules={[{ required: true, message: 'Please input source name!' }]}>
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item name="type" rules={[{ required: true, message: 'Please input source type!' }]}>
        <Select placeholder="Please select a type">
            {Object.keys(sourceTypes).map((key) => <Option value={key}>{React.createElement(sourceTypes[key].icon)} {sourceTypes[key].text}</Option>)};
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
          {data ? 'Edit' : 'Create'} 
        </Button>
      </Form.Item>
    </Form>
  );
};
