import React from 'react';
import { Switch } from "antd";

export type SimpleEditorProps = {
  value: boolean;
  name: string;
  onChange: (newValue: boolean) => void;
  [other :string]: any;
};

export const SwitchEditor: React.FC<SimpleEditorProps> = ({ name, value, onChange, ...otherProps }) => {
  return <Switch style={{marginLeft: '10px'}} checked={value} onChange={(newValue) => onChange(newValue)} />;
};
