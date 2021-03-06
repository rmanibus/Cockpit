import React from 'react';
import { Drawer, Button } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
import { ServiceEditor } from 'components/editors/ServiceEditor';
import { StackContext, StackContextValue } from 'contexts/StackContext';
import { DataContext, DataContextValue } from 'contexts/DataContext';
import { PageProps } from 'types/Props';
import { HistoryView } from 'components/views/HistoryView';

const Service: React.FC<PageProps> = ({ setHeader }) => {
  const { data, type } = React.useContext<DataContextValue>(DataContext);
  const { stack, serviceId } = React.useContext<StackContextValue>(StackContext);
  const [visible, setVisible] = React.useState(false);

  const showHistory = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  React.useEffect(() => {
    data &&
      type === 'stack' &&
      setHeader({
        title: serviceId,
        extra: <Button shape="circle" icon={<HistoryOutlined />} onClick={showHistory} />,
        breadcrumb: [
          { path: '/', breadcrumbName: 'Home' },
          { path: '/stacks', breadcrumbName: 'Stacks' },
          { path: '/stacks/' + data.id, breadcrumbName: data.name },
          { path: '/stacks/' + data.id + '/services/' + serviceId, breadcrumbName: serviceId },
        ],
      });
  }, [data, type, serviceId]);

  return (
    <>
      {stack && <ServiceEditor />}
      <Drawer title="Service history" width={720} onClose={onClose} destroyOnClose visible={visible} bodyStyle={{ paddingBottom: 80 }}>
        <HistoryView/>
      </Drawer>
    </>
  );
};
export default Service;
