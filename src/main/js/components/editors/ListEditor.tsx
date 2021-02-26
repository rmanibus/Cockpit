import React from 'react';
import { Button, Table, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { SimpleEditor } from './SimpleEditor';
import { isArray } from 'lodash';

type ArrayFieldProps = {
  name?: string;
  value: string | string[];
  update: (added: string | string[], removed?: string | string[]) => void;
};

export const ListEditor: React.FC<ArrayFieldProps> = ({ name, value, update }) => {

  const convertToArray = () => {
    update([value as string || "" ]);
  };
  React.useEffect(() => {
    isArray(value) && value.length === 0 && update("");
  }, [value]);

  if (!value || !isArray(value)) {
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <SimpleEditor style={{flexGrow: '1'}} name={name} value={value as string} onChange={update} />
        <Button style={{marginLeft: '10px',float: 'right'}} shape="circle">
          <UnorderedListOutlined onClick={convertToArray} />
        </Button>
      </div>
    );
  }
  return (
    <>
      <ListTable name={name} list={value as string[]} update={update} />
    </>
  );
};

export type ListProps = {
  name?: string;
  list: string[];
  update: (added: string[], removed?: string[]) => void;
};
export const ListTable: React.FC<ListProps> = ({ name, list, update }: ListProps) => {
  const updateItem = (index) => (key) => {
    const newList = [];
    newList[index] = key;
    update(newList);
  };
  const addItem = () => {
    const newList = [...list, ''];
    update(newList);
  };
  const removeItem = (index) => () => {
    const newList = [];
    newList[index] = list[index];
    update([], newList);
  };
  const columns = [
    {
      title: 'Value',
      dataIndex: 'itemValue',
      render: (value, item) => <SimpleEditor name={item.index} value={value} onChange={updateItem(item.index)}></SimpleEditor>,
    },
    {
      title: <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={addItem} />,
      key: 'actions',
      render: (text, item) => (
        <Space>
          <Button shape="circle" danger onClick={removeItem(item.index)} icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return <Table dataSource={list && list.map((item, index) => ({ index: index, itemValue: item }))} columns={columns} />;
};
