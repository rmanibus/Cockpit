import React from 'react';
import { Form } from 'antd';

export const SimpleEditorCardContainer: React.FC = ({ children }) => {
  return (
    <Form
      labelAlign="left"
      labelCol={{
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 10 },
        lg: { span: 10 },
        xl: { span: 7 },
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
        md: { span: 14 },
        lg: { span: 14 },
        xl: { span: 17 },
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

export const SimpleEditorContainer: React.FC = ({ children }) => {
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