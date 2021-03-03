import React from 'react';
import { message, Table, Space } from 'antd';
import api from 'api';
import { DaemonProps } from './types';


export const VolumesListView: React.FC<DaemonProps> = ({ dockerId }: DaemonProps) => {
  const [volumes, setVolumes] = React.useState([]);

  React.useEffect(() => {
    dockerId && api
      .get('daemon/' + dockerId + '/volumes')
      .then((res) => {
        setVolumes(res.data);
      })
      .catch(() => {
        message.error('failed to fetch volumes');
      });
  }, [dockerId]);

  const volumesColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => <a>{name}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, item) => <VolumeItemActions />,
    },
  ];
  return (
    <>
      <h2>Volumes</h2>
      <Table
        columns={volumesColumns}
        dataSource={volumes.map((volume) => {
          return { name: volume.Name };
        })}
      />
    </>
  );
};

export const VolumeItemActions: React.FC = () => {
  return <Space size="middle"></Space>;
};
