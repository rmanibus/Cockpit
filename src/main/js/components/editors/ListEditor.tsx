import React from 'react';
import { Button, Input, Row, Col, Tag, Table, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

export type ListProps<T> = {
  name?: string;
  list: T;
  update: any;
};

export const ListEditor: React.FC<ListProps<any>> = ({ name, list, update }: ListProps<any>) => {
  const addItem = () => {
    Array.isArray(list) ? addItemAsList() : addItemAsDict();
  };
  const addItemAsList = () => {
    const newList = [...list, '='];
    update(newList);
  };
  const addItemAsDict = () => {
    const indexes = Object.keys(list || {})
      .filter((val) => val.startsWith('new'))
      .map((val) => parseInt(val.replace('new', '')));

    const index = Math.max(0, ...indexes) + 1;
    const newList = { ...list, ['new' + index]: 'value' };
    update(newList);
  };
  return (
    <>
      <Button style={{ float: 'right' }} type="primary" shape="circle" icon={<PlusOutlined />} onClick={addItem} />
      <h2>
        {name} {Array.isArray(list) ? <Tag>array</Tag> : <Tag>dict</Tag>}
      </h2>
      {Array.isArray(list) ? <ListTable list={list} update={update} /> : <DictTable list={list} update={update} />}
    </>
  );
};

const ListTable: React.FC<ListProps<any>> = ({ list, update }: ListProps<any>) => {
  const inputRef = React.useRef<any>([]);
  const [focusedKey, setFocusedKey] = React.useState(null);

  React.useEffect(() => {
    focusedKey && inputRef.current[focusedKey] && inputRef.current[focusedKey].focus({ cursor: 'end' });
  }, [focusedKey]);

  const updateKey = (index) => (key) => {
    setFocusedKey(key);
    const newList = [];
    newList[index] = key + '=' + list[index].split('=')[1];
    update(newList);
  };
  const updateValue = (index) => (value) => {
    const newList = [];
    newList[index] = list[index].split('=')[0] + '=' + value;
    update(newList);
  };
  const remove = (index) => () => {
    const newList = [];
    newList[index] = list[index];
    update([], newList);
  };

  const eventAdapter = (fun) => {
    return (e) => fun(e.target.value);
  };

  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      render: (text, item) => (
        <Input
          addonBefore="key"
          placeholder="key"
          value={text}
          onChange={eventAdapter(updateKey(item.index))}
          ref={(ref) => (inputRef.current[item.key] = ref)}
        />
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (text, item) => <Input addonBefore="value" placeholder="value" value={text} onChange={eventAdapter(updateValue(item.index))} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, item) => (
        <Space>
          <Button shape="circle" danger onClick={remove(item.index)} icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={
        list &&
        list.map((item, index) => {
          return { index: index, key: item.split('=')[0], value: item.split('=')[1] };
        })
      }
      columns={columns}
    />
  );
};

const DictTable: React.FC<ListProps<any>> = ({ list, update }: ListProps<any>) => {
  const inputRef = React.useRef<any>([]);
  const [focusedKey, setFocusedKey] = React.useState(null);

  React.useEffect(() => {
    focusedKey && inputRef.current[focusedKey] && inputRef.current[focusedKey].focus({ cursor: 'end' });
  }, [focusedKey]);

  const updateKey = (oldKey) => (newkey) => {
    setFocusedKey(newkey);
    update({ [newkey]: list[oldKey] }, { [oldKey]: list[oldKey] });
  };
  const updateValue = (key) => (value) => {
    update({ [key]: value });
  };
  const remove = (key) => () => {
    update({}, { [key]: list[key] });
  };
  const eventAdapter = (fun) => {
    return (e) => fun(e.target.value);
  };

  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      render: (key, record) => (
        <Input placeholder="key" value={key} onChange={eventAdapter(updateKey(key))} ref={(ref) => (inputRef.current[key] = ref)} />
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value, item) => <Input placeholder="value" value={value} onChange={eventAdapter(updateValue(item.key))} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, item) => (
        <Space>
          <Button
            shape="circle"
            onClick={() => {
              inputRef.current[item.key].focus({ cursor: 'end' });
            }}
            icon={<DeleteOutlined />}
          />
          <Button shape="circle" danger onClick={remove(item.key)} icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={
        list &&
        Object.entries(list)
          .sort(([key1], [key2]) => key1.localeCompare(key2))
          .map(([key, itemValue]) => {
            return { key: key, value: itemValue };
          })
      }
      columns={columns}
    />
  );
};
