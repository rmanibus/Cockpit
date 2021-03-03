import React from 'react';
import { useRouter } from 'next/router';
import { message, Table, Space } from 'antd';
import api from 'api';
import { DaemonProps } from './types';

export const ServicesListView: React.FC<DaemonProps> = ({ dockerId }: DaemonProps) => {
  const router = useRouter();
  const [service, setServices] = React.useState([]);
  const onCell = (item, rowIndex) => {
    return { onClick: (event) => router.push('/dockers/' + dockerId + '/services/' + item.id) };
  };

  React.useEffect(() => {
    dockerId && api
      .get('daemon/' + dockerId + '/services')
      .then((res) => {
        setServices(res.data);
      })
      .catch(() => {
        message.error('failed to fetch services');
      });
  }, [dockerId]);

  const servicesColumns = [
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
      render: (text, item) => <ServiceItemActions />,
    },
  ];
  return (
    <>
      <h2>Services</h2>
      <Table
        columns={servicesColumns}
        dataSource={service.map((service) => {
          return { id: service.ID, name: service.Spec.Name };
        })}
      />
    </>
  );
};

export const ServiceItemActions: React.FC = () => {
  return <Space size="middle"></Space>;
};
