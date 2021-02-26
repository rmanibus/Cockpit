import React from 'react';
import { Table, Space, Button, Tag, message, Drawer, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { EditSourceForm } from '../forms/SourceForm';
import { sourceTypes } from 'translations/constants';
import { DataContext } from 'contexts/DataContext';
import { Source } from 'types/Source';

export const SourcesView: React.FC = () => {
  const { listData } = React.useContext(DataContext);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (type) => (
        <Tag color={sourceTypes[type].color}>
          {React.createElement(sourceTypes[type].icon)} {sourceTypes[type].text}
        </Tag>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      render: (text) => {
        text;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, item) => <SourceItem item={item} />,
    },
  ];

  console.log(listData);
  return <Table columns={columns} dataSource={listData} />;
};
type SourceItemProps = {
  item: Source;
};
export const SourceItem: React.FC<SourceItemProps> = ({ item }) => {
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
        <EditSourceForm afterFinish={closeDrawer} id={item.id} />
      </Drawer>
    </>
  );
};
