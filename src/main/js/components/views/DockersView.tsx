import React from 'react';
import { Table, Space, Button, Tag, message, Drawer, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { EditDockerForm } from '../forms/DockerForm';
import { DataContext } from 'contexts/DataContext';
import { Source } from 'types/Source';

export const DockersView: React.FC = () => {
  const { listData, loading } = React.useContext(DataContext);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      render: (text) => text,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, item) => <DockerItem item={item} />,
    },
  ];
  return <Table columns={columns} loading={loading} dataSource={listData} />;
};
type SourceItemProps = {
  item: Source;
};
export const DockerItem: React.FC<SourceItemProps> = ({ item }) => {
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
      <Drawer title={'Edit Docker ' + item.name} width={720} onClose={closeDrawer} destroyOnClose visible={visible} bodyStyle={{ paddingBottom: 80 }}>
        <EditDockerForm afterFinish={closeDrawer} id={item.id} />
      </Drawer>
    </>
  );
};
