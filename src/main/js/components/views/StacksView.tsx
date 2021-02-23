import React from 'react';
import { List, Button, Tag, message, Drawer } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { EditSourceForm } from '../forms/SourceForm';
import { sourceTypes } from '../../translations/Source';
import { DataContext } from '../../contexts/DataContext';
import { Stack } from '../../types/Stack';

type StackViewProps = {
  addItem: any;
};

export const StacksView: React.FC<StackViewProps> = ({ addItem }) => {
  const { listData } = React.useContext(DataContext);
  return (
    <>
      <Button style={{ float: 'right' }} type="primary" shape="circle" icon={<PlusOutlined />} onClick={addItem} />
      <h2>Stacks</h2>
      <List itemLayout="horizontal" dataSource={listData} renderItem={(item) => <StackItem item={item} />} />
    </>
  );
};

type StackItemProps = {
  item: Stack;
};
export const StackItem: React.FC<StackItemProps> = ({ item }) => {
  const { remove } = React.useContext(DataContext);

  const [visible, setVisible] = React.useState(false);
  const closeDrawer = () => {
      setVisible(false);
  }

  const onRemove = () => {
    remove(item.id)
      .then(() => message.success('source removed !'))
      .catch(() => message.error('failed to remove source'));
  };
  const onEdit = () => {
    setVisible(true);
  };
  return (
    <List.Item>
      <List.Item.Meta
        onClick={onEdit}
        title={
          <>
            <Tag color={sourceTypes[item.source.type].color}>
              {React.createElement(sourceTypes[item.source.type].icon)} {sourceTypes[item.source.type].text}
            </Tag>
            {item.name}
          </>
        }
        description={'description'}
      />
      <Button shape="circle" danger onClick={onRemove} icon={<DeleteOutlined />} />
      <Drawer title={"Edit Source " + item.name } width={720} onClose={closeDrawer} destroyOnClose visible={visible} bodyStyle={{ paddingBottom: 80 }}>
          <EditSourceForm afterFinish={closeDrawer} id={item.id} />
      </Drawer>
    </List.Item>
  );
};
