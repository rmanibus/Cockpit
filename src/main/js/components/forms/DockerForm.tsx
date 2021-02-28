import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { DataContext } from 'contexts/DataContext';
import { sourceTypes } from 'translations/constants';
import { Source } from 'types/Source';
const { Option } = Select;

type EditDockerFormProps = {
    afterFinish: any;
    id: string;
};

export const EditDockerForm: React.FC<EditDockerFormProps> = ({ id, afterFinish }) => {
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

    return <DockerForm data={data} onFinish={onFinish}/>
}

type CreateDockerFormProps = {
    afterFinish: any;
};

  
export const CreateDockerForm: React.FC<CreateDockerFormProps> = ({ afterFinish }) => {
    const { create } = React.useContext(DataContext);
    const onFinish = (values: any) => {
      create(values)
        .then(afterFinish)
        .then(() => message.success('source created !'))
        .catch(() => message.error('failed to create source !'));
    };
    return <DockerForm onFinish={onFinish}/>
}

type DockerFormProps = {
    data?: Source;
    onFinish: any;
};
  
export const DockerForm: React.FC<DockerFormProps> = ({ data, onFinish }) => {

  let [form] = Form.useForm();
  React.useEffect(() => {
    form && data && form.setFieldsValue(data);
  })
  return (
    <Form form={form} initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item name="name" rules={[{ required: true, message: 'Please input docker name!' }]}>
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item name="location" rules={[{ required: true, message: 'Please input docker location!' }]}>
        <Input placeholder="Location" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {data ? 'Edit' : 'Create'} 
        </Button>
      </Form.Item>
    </Form>
  );
};
