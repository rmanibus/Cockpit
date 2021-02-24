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

type ListEditedSpec = {
  column: string;
  key: number;
};

const ListTable: React.FC<ListProps<any>> = ({ list, update }: ListProps<any>) => {
  const [edited, setEdited] = React.useState<ListEditedSpec>({ column: null, key: null });
  const updateKey = (index) => (key) => {
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
  const isEdited = (spec: ListEditedSpec) => {
    return edited && edited.key == spec.key && edited.column == spec.column;
  };
  const edit = (spec: ListEditedSpec) => () => {
    setEdited(spec);
  };
  const leave = () => {
    setEdited({ column: null, key: null });
  };
  const columns = [
    {
      title: 'Key',
      dataIndex: 'itemKey',
      render: (text, item) =>
        isEdited({ column: 'key', key: item.index }) ? (
          <Input onBlur={leave} placeholder="key" value={text} onChange={eventAdapter(updateKey(item.index))} />
        ) : (
          <div style={{ width: '100%', minHeight: '30px' }} onClick={edit({ column: 'key', key: item.index })}>
            {text}
          </div>
        ),
    },
    {
      title: 'Value',
      dataIndex: 'itemValue',
      render: (text, item) =>
        isEdited({ column: 'value', key: item.index }) ? (
          <Input onBlur={leave} placeholder="value" value={text} onChange={eventAdapter(updateValue(item.index))} />
        ) : (
          <div style={{ width: '100%', minHeight: '30px' }} onClick={edit({ column: 'value', key: item.index })}>
            {text}
          </div>
        ),
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
      dataSource={list && list.map((item, index) => ({ index: index, itemKey: item.split('=')[0], itemValue: item.split('=')[1] }))}
      columns={columns}
    />
  );
};

type DictEditedSpec = {
  column: string;
  key: string;
};

const DictTable: React.FC<ListProps<any>> = ({ list, update }: ListProps<any>) => {
  const inputRef = React.useRef<any>([]);
  const [focusedKey, setFocusedKey] = React.useState(null);
  const [edited, setEdited] = React.useState<DictEditedSpec>({ column: null, key: null });

  React.useEffect(() => {
    focusedKey && inputRef.current[focusedKey] && inputRef.current[focusedKey].focus({ cursor: 'end' });
  }, [focusedKey]);

  const updateKey = (oldKey) => (newkey) => {
    setFocusedKey(newkey);
    setEdited({ column: 'key', key: newkey });
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

  const isEdited = (spec: DictEditedSpec) => {
    return edited && edited.key == spec.key && edited.column == spec.column;
  };
  const edit = (spec: DictEditedSpec) => () => {
    setEdited(spec);
  };
  const leave = () => {
    setEdited({ column: null, key: null });
  };
  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      render: (key, item) =>
        isEdited({ column: 'key', key: key }) ? (
          <Input onBlur={leave} placeholder="key" value={key} onChange={eventAdapter(updateKey(key))} ref={(ref) => (inputRef.current[key] = ref)} />
        ) : (
          <div style={{ width: '100%', minHeight: '30px' }} onClick={edit({ column: 'key', key: key })}>
            {key}
          </div>
        ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value, item) =>
        isEdited({ column: 'value', key: item.key }) ? (
          <Input onBlur={leave} placeholder="value" value={value} onChange={eventAdapter(updateValue(item.key))} />
        ) : (
          <div style={{ width: '100%', minHeight: '30px' }} onClick={edit({ column: 'value', key: item.key })}>
            {value}
          </div>
        ),
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
