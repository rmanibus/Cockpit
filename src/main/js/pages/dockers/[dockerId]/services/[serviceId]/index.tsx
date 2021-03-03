import React from 'react';
import { useRouter } from 'next/router';
import { DataContext, DataContextValue } from 'contexts/DataContext';
import { PageProps } from 'types/Props';
import { ServiceView } from 'components/views/daemon/ServiceView';

const Service: React.FC<PageProps> = ({ setHeader }) => {
  const router = useRouter();
  const { data, type, setPath } = React.useContext<DataContextValue>(DataContext);
  const { dockerId, serviceId } = router.query;

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
          { path: '/dockers/' + data.id + '/services/' + serviceId, breadcrumbName: serviceId },
        ],
      });
  }, [data, type, serviceId]);

  return (
    <>
        <ServiceView dockerId={dockerId as string} serviceId={serviceId as string} />
    </>
  );
};
export default Service;
