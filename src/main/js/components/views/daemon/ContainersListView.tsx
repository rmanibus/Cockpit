import React from 'react';
import { message, Table, Space } from 'antd';
import api from 'api';
import { DaemonProps } from './type';

export const ContainersListView: React.FC<DaemonProps> = ({ dockerId }: DaemonProps) => {
  const [containers, setContainers] = React.useState([]);

  React.useEffect(() => {
    api
      .get('daemon/' + dockerId + '/containers')
      .then((res) => {
        setContainers(res.data);
      })
      .catch(() => {
        message.error('failed to fetch containers');
      });
  }, [dockerId]);

  const containersColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => <a>{name}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, item) => <ContainerItemActions />,
    },
  ];
  return (
    <>
      <h2>Containers</h2>
      <Table
        columns={containersColumns}
        dataSource={containers.map((container) => {
          return { name: container.Names[0] };
        })}
      />
    </>
  );
};

export const ContainerItemActions: React.FC = () => {
  return <Space size="middle"></Space>;
};
