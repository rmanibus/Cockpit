import React from 'react';
import { SecretEditor } from 'components/editors/SecretEditor';
import { StackContext, StackContextValue } from 'contexts/StackContext';
import { DataContext, DataContextValue } from 'contexts/DataContext';
import { PageProps } from 'types/Props';

const Network: React.FC<PageProps> = ({ setHeader }) => {
  const { data, type } = React.useContext<DataContextValue>(DataContext);
  const { stack, secretId } = React.useContext<StackContextValue>(StackContext);

  React.useEffect(() => {
    data &&
      type === 'stack' &&
      setHeader({
        title: secretId,
        breadcrumb: [
          { path: '/', breadcrumbName: 'Home' },
          { path: '/stacks', breadcrumbName: 'Stacks' },
          { path: '/stacks/' + data.id, breadcrumbName: data.name },
          { path: '/stacks/' + data.id + '/secrets/' + secretId, breadcrumbName: secretId },
        ],
      });
  }, [data, type, secretId]);

  return <>{stack && <SecretEditor />}</>;
};
export default Network;
