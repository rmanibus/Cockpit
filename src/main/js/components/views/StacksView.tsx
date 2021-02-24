import React from 'react';
import { useRouter } from 'next/router';
import { Table, Button, Tag, message, Drawer, Space, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { EditStackForm } from '../forms/StackForm';
import { sourceTypes } from '../../translations/Source';
import { DataContext } from '../../contexts/DataContext';
import { Stack } from '../../types/Stack';


export const StacksView: React.FC = () => {
  const router = useRouter();
  const { listData } = React.useContext(DataContext);
  const onCell = (item, rowIndex) => {
    return { onClick: (event) => router.push('stacks/' + item.id) };
  };
  const columns = [
    {
      onCell: onCell,
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      onCell: onCell,
      title: 'Source',
      key: 'source',
      dataIndex: 'source',
      render: (source) => (
        <Tag color={sourceTypes[source.type].color}>
          {React.createElement(sourceTypes[source.type].icon)} {sourceTypes[source.type].text}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, item) => <StackItem item={item} />,
    },
  ];

  return (
      <Table columns={columns} dataSource={listData} />
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
  };

  const onRemove = () => {
    remove(item.id)
      .then(() => message.success('source removed !'))
      .catch(() => message.error('failed to remove source'));
  };
  const onEdit = () => {
    setVisible(true);
  };
  return (
    <>
      <Space size="middle">
        <Button shape="circle" onClick={onEdit} icon={<EditOutlined />} />
        <Popconfirm title="Sure to delete?" onConfirm={onRemove}>
          <Button shape="circle" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
      <Drawer title={'Edit Source ' + item.name} width={720} onClose={closeDrawer} destroyOnClose visible={visible} bodyStyle={{ paddingBottom: 80 }}>
        <EditStackForm afterFinish={closeDrawer} id={item.id} />
      </Drawer>
    </>
  );
};
