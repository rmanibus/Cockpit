import React from 'react';
import { Select, Tag } from 'antd';

const { Option } = Select;

export type SelectEditorProps = {
  value?: string;
  choices: string[];
  name: string;
  onChange: (newValue: string) => void;
  [other :string]: any;
};

export const SelectEditor: React.FC<SelectEditorProps> = ({ choices, name, value, onChange, ...otherProps }) => {
  const [active, setActive] = React.useState(false);
  const activate = () => {
    setActive(true);
  };
  const deActivate = () => {
    setActive(false);
  };

  if (!active) {
    return (
      <div {...otherProps} style={{ lineHeight: '2em', paddingLeft: '12px', width: '100%', minHeight: '30px' }} onClick={activate}>
        {value &&  <Tag>{value}</Tag>}
      </div>
    );
  }
  return <Select
  onBlur={deActivate}
  placeholder={name}
  value={value}
  allowClear
  style={{ width: '100%' }}
  onChange={(value) => onChange(value)}
>
  {choices.map((choice) => (
    <Option value={choice}>{choice}</Option>
  ))}
</Select>;
};
