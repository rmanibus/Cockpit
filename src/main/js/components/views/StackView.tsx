import React from 'react';
import { useRouter } from 'next/router';
import { Table, Button, Space, PageHeader } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Stack } from '../../types/Stack';
import { StackContext, StackContextValue } from '../../contexts/StackContext';
import { DataContext, DataContextValue } from '../../contexts/DataContext';


export const StackView: React.FC = () => {
  const { stack, stackId } = React.useContext<StackContextValue>(StackContext);
  const { data, type } = React.useContext<DataContextValue>(DataContext);

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
