import React from 'react';
import { useRouter } from 'next/router';
import { Table, Button, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Stack } from '../../types/Stack';
import { DockerStack } from '../../types/DockerStack';

type StackViewProps = {
    stackId: string
    stack: DockerStack
};

export const StackView: React.FC<StackViewProps> = ({stackId, stack}) => {
  const router = useRouter();
  const onCell = (item, rowIndex  ) => {return {onClick: event => router.push('/stacks/' + stackId + '/' + item.name)}};
  const columns = [
    {
      onCell: onCell,
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => <a>{name}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, item) => <ServiceItemActions item={item} />,
    },
  ];


  return (
    <>
      <Button style={{ float: 'right' }} type="primary" shape="circle" icon={<PlusOutlined />} />
      <h2>Stack</h2>
      <Table columns={columns} dataSource={Object.entries(stack.services).map(([key, value]) => {return {name: key}})} />
    </>
  );
};

type ServiceItemActionsProps = {
  item: Stack;
};
export const ServiceItemActions: React.FC<ServiceItemActionsProps> = ({ item }) => {
  return (
    <>
      <Space size="middle">
      </Space>
    </>
  );
};
