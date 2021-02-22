import React from 'react';
import { Button, Input, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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

    const index = Math.max(0,...indexes) + 1;

    console.log(indexes);

    const newList = { ...list, ['new' + index]: 'value' };
    update(newList);
  };
  return (
    <>
      {Array.isArray(list) ? asList(list, update) : asDict(list, update)}
      <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={addItem} />
    </>
  );
};

const asList = (list, update) => {
  const updateKey = (index) => (key) => {
    const newList = [...list];
    newList[index] = key + '=' + newList[index].split('=')[1];
    update(newList);
  };
  const updateValue = (index) => (value) => {
    const newList = [...list];
    newList[index] = newList[index].split('=')[0] + '=' + value;
    update(newList);
  };
  const eventAdapter = (fun) => {
    return (e) => fun(e.target.value);
  };
  return list.map((item, index) => (
    <Input.Group>
      <Row gutter={8}>
        <Col span={16}>
          <Input placeholder="key" value={item.split('=')[0]} onChange={eventAdapter(updateKey(index))} />
        </Col>
        <Col span={8}>
          <Input placeholder="value" value={item.split('=')[1] || ''} onChange={eventAdapter(updateValue(index))} />
        </Col>
      </Row>
    </Input.Group>
  ));
};
const asDict = (list, update) => {
  const updateKey = (oldKey) => (newkey) => {
    const newList = { ...list };
    delete newList[oldKey];
    newList[newkey] = list[oldKey];
    update(newList);
  };
  const updateValue = (key) => (value) => {
    const newList = { ...list };
    newList[key] = value;
    update(newList);
  };
  const eventAdapter = (fun) => {
    return (e) => fun(e.target.value);
  };
  return (
    list &&
    Object.entries(list)
      .sort(([key1], [key2]) => key1.localeCompare(key2))
      .map(([key, itemValue]) => {
        return (
          <Input.Group>
            <Row gutter={8}>
              <Col span={16}>
                <Input placeholder="key" value={key} onChange={eventAdapter(updateKey(key))} />
              </Col>
              <Col span={8}>
                <Input placeholder="value" value={itemValue} onChange={eventAdapter(updateValue(key))} />
              </Col>
            </Row>
          </Input.Group>
        );
      })
  );
};
