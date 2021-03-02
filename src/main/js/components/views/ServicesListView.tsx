import React from 'react';
import { useRouter } from 'next/router';
import { Table, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Stack } from 'types/Stack';
import { StackContext, StackContextValue } from 'contexts/StackContext';

export const ServicesListView: React.FC = () => {
  const { stack, stackId } = React.useContext<StackContextValue>(StackContext);
  const router = useRouter();

  const onCell = (item, rowIndex) => {
    return { onClick: (event) => router.push('/stacks/' + stackId + '/services/' + item.name) };
  };
  const servicesColumns = [
    {
      onCell: onCell,
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => <a>{name}</a>,
    },
    {
      onCell: onCell,
      title: 'Ports',
      dataIndex: 'ports',
      key: 'ports',
      render: (ports) => ports && ports.join(', '),
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
      <h2>Services</h2>
      <Table
        columns={servicesColumns}
        dataSource={Object.entries(stack.services).map(([key, value]) => {
          return { name: key, ports: value.ports };
        })}
      />
    </>
  );
};

type ServiceItemActionsProps = {
  item: Stack;
};
export const ServiceItemActions: React.FC<ServiceItemActionsProps> = ({ item }) => {
  return (
    <>
      <Space size="middle"></Space>
    </>
  );
};
