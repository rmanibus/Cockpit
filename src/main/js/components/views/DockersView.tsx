import React from 'react';
import { useRouter } from 'next/router';

import { DeleteOutlined, EditOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { Table, Space, Button, message, Drawer, Popconfirm } from 'antd';
import { EditDockerForm } from '../forms/DockerForm';
import { DataContext } from 'contexts/DataContext';
import { Docker } from 'types/Docker';
import api from 'api';

export const DockersView: React.FC = () => {
  const router = useRouter();
  const { listData, loading } = React.useContext(DataContext);
  const onCell = (item, rowIndex) => {
    return { onClick: (event) => router.push('dockers/' + item.id) };
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
      title: 'Location',
      dataIndex: 'location',
      render: (text, item) => <DockerLocationItem item={item} />,
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
  item: Docker;
};


export const DockerLocationItem: React.FC<SourceItemProps> = ({ item }) => {

  const [available, setAvailable] = React.useState(false);

  React.useEffect(() => {
    api.get('daemon/' + item.id + '/ping')
    .then((res) => {
      setAvailable(res.data);
    })
  }, [api, item]);

  return (
    <Space>
    {available ? <CheckCircleOutlined style={{color: 'green'}} />: <CloseCircleOutlined style={{color: 'red'}} />}{item.location}
    </Space>
  );
};

export const DockerItem: React.FC<SourceItemProps> = ({ item }) => {
  const { remove } = React.useContext(DataContext);

  const [visible, setVisible] = React.useState(false);

  const closeDrawer = () => {
    setVisible(false);
  };

  const onRemove = () => {
    remove(item.id)
      .then(() => message.success('docker removed !'))
      .catch(() => message.error('failed to remove docker'));
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
