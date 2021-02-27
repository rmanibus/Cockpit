import React from 'react';
import { useRouter } from 'next/router';
import { Table, Button, Tag, message, Drawer, Space, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { EditStackForm } from '../forms/StackForm';
import { sourceTypes, stackTypes, commitModes } from 'translations/constants';
import { DataContext } from 'contexts/DataContext';
import { Stack } from 'types/Stack';

export const StacksView: React.FC = () => {
  const router = useRouter();
  const { listData, loading } = React.useContext(DataContext);
  const onCell = (item, rowIndex) => {
    return { onClick: (event) => router.push('stacks/' + item.id) };
  };
  const columns = [
    {
      onCell: onCell,
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      onCell: onCell,
      title: 'Type',
      dataIndex: 'type',
      render: (type, item) => (
        <>
          <Tag color={stackTypes[type].color}>{stackTypes[type].text}</Tag>
          {React.createElement(commitModes[item.commitMode].icon)}
        </>
      ),
    },
    {
      onCell: onCell,
      title: 'Source',
      key: 'source',
      dataIndex: 'source',
      render: (source, item) => (
        <>
          <Tag color={sourceTypes[source.type].color}>
            {React.createElement(sourceTypes[source.type].icon)} {source.name}
          </Tag>{' '}
          {item.path}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, item) => <StackItem item={item} />,
    },
  ];

  return <Table columns={columns} dataSource={listData} loading={loading} />;
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
