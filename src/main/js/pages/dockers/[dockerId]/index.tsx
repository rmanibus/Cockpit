import React from 'react';
import { useRouter } from 'next/router';
import { DataContext, DataContextValue } from 'contexts/DataContext';
import { PageProps } from 'types/Props';
import { ServicesListView } from 'components/views/daemon/ServicesListView';
import { ContainersListView } from 'components/views/daemon/ContainersListView';
import { VolumesListView } from 'components/views/daemon/VolumesListView';

const Docker: React.FC<PageProps> = ({ setHeader }) => {
  const router = useRouter();
  const { data, type, setPath } = React.useContext<DataContextValue>(DataContext);
  const { dockerId } = router.query;

  React.useEffect(() => {
    setPath({context: 'dockers', id: dockerId as string});
  }, [setPath, dockerId]);

  React.useEffect(() => {
    data &&
      type === 'docker' &&
      setHeader({
        title: data.name,
        breadcrumb: [
          { path: '/', breadcrumbName: 'Home' },
          { path: '/dockers', breadcrumbName: 'Dockers' },
          { path: '/dockers/' + data.id, breadcrumbName: data.name },
        ],
      });
  }, [data, type]);

  return (
    <>
        <ServicesListView dockerId={dockerId as string} />
        <ContainersListView dockerId={dockerId as string} />
        <VolumesListView dockerId={dockerId as string} />

    </>
  );
};
export default Docker;
