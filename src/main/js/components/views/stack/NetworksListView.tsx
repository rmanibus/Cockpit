import React from 'react';
import { useRouter } from 'next/router';
import { Table, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { StackContext, StackContextValue } from 'contexts/StackContext';

export const NetworksListView: React.FC = () => {
  const { stack, stackId } = React.useContext<StackContextValue>(StackContext);
  const router = useRouter();

  const onCell = (item, rowIndex) => {
    return { onClick: (event) => router.push('/stacks/' + stackId + '/networks/' + item.name) };
  };
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
      render: (text, item) => <></>,
    },
  ];
  return (
    <>
      <Button style={{ float: 'right' }} type="primary" shape="circle" icon={<PlusOutlined />} />
      <h2>Networks</h2>
      <Table
        columns={columns}
        dataSource={Object.entries(stack.networks).map(([key, value]) => {
          return { name: key };
        })}
      />
    </>
  );
};
