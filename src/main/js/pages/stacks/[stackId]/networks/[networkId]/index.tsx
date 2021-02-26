import React from 'react';
import { NetworkEditor } from 'components/editors/NetworkEditor';
import { StackContext, StackContextValue } from 'contexts/StackContext';
import { DataContext, DataContextValue } from 'contexts/DataContext';
import { PageProps } from 'types/Props';

const Network: React.FC<PageProps> = ({ setHeader }) => {
  const { data, type } = React.useContext<DataContextValue>(DataContext);
  const { stack, networkId } = React.useContext<StackContextValue>(StackContext);

  React.useEffect(() => {
    data &&
      type === 'stack' &&
      setHeader({
        title: networkId,
        breadcrumb: [
          { path: '/', breadcrumbName: 'Home' },
          { path: '/stacks', breadcrumbName: 'Stacks' },
          { path: '/stacks/' + data.id, breadcrumbName: data.name },
          { path: '/stacks/' + data.id + '/networks/' + networkId, breadcrumbName: networkId },
        ],
      });
  }, [data, type, networkId]);

  return <>{stack && <NetworkEditor  />}</>;
};
export default Network;
