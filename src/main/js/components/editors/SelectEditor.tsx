import React from 'react';
import { Select, Tag } from 'antd';

const { Option } = Select;

export type SelectEditorProps = {
  list?: string[];
  choices: string[];
  name: string;
  onChange: (newValue: string[]) => void;
  [other :string]: any;
};

export const SelectEditor: React.FC<SelectEditorProps> = ({ choices, name, list, onChange, ...otherProps }) => {
  const [active, setActive] = React.useState(false);
  const eventAdapter = (fun: (param: string) => any) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => fun(e.target.value);
  };
  const activate = () => {
    setActive(true);
  };
  const deActivate = () => {
    setActive(false);
  };

  if (!active) {
    return (
      <div {...otherProps} style={{ width: '100%', minHeight: '30px' }} onClick={activate}>
        {list && list.map((element) => <Tag>{element}</Tag>)}
      </div>
    );
  }
  return <Select
  onBlur={deActivate}
  placeholder={name}
  value={list}
  mode="multiple"
  allowClear
  style={{ width: '100%' }}
  onChange={(value) => onChange(value)}
>
  {choices.map((choice) => (
    <Option value={choice}>{choice}</Option>
  ))}
</Select>;
};
