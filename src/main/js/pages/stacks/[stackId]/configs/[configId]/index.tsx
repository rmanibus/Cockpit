import React from 'react';
import { ConfigEditor } from 'components/editors/ConfigEditor';
import { StackContext, StackContextValue } from 'contexts/StackContext';
import { DataContext, DataContextValue } from 'contexts/DataContext';
import { PageProps } from 'types/Props';

const Network: React.FC<PageProps> = ({ setHeader }) => {
  const { data, type } = React.useContext<DataContextValue>(DataContext);
  const { stack, configId } = React.useContext<StackContextValue>(StackContext);

  React.useEffect(() => {
    data &&
      type === 'stack' &&
      setHeader({
        title: configId,
        breadcrumb: [
          { path: '/', breadcrumbName: 'Home' },
          { path: '/stacks', breadcrumbName: 'Stacks' },
          { path: '/stacks/' + data.id, breadcrumbName: data.name },
          { path: '/stacks/' + data.id + '/configs/' + configId, breadcrumbName: configId },
        ],
      });
  }, [data, type, configId]);

  return <>{stack && <ConfigEditor  />}</>;
};
export default Network;
