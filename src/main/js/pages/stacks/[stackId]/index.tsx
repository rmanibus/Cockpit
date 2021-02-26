import React from 'react';
import { Drawer, Button } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
import { StackView } from 'components/views/StackView';
import { StackContext, StackContextValue } from 'contexts/StackContext';
import { DataContext, DataContextValue } from 'contexts/DataContext';
import { PageProps } from 'types/Props';
import { HistoryView } from 'components/views/HistoryView';

const Stack: React.FC<PageProps> = ({ setHeader }) => {
  const { data, type } = React.useContext<DataContextValue>(DataContext);
  const { stack } = React.useContext<StackContextValue>(StackContext);
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
        title: data.name,
        extra: <Button shape="circle" icon={<HistoryOutlined />} onClick={showHistory} />,
        breadcrumb: [
          { path: '/', breadcrumbName: 'Home' },
          { path: '/stacks', breadcrumbName: 'Stacks' },
          { path: '/stacks/' + data.id, breadcrumbName: data.name },
        ],
      });
  }, [data, type]);
  return (
    <>
      {stack && <StackView />}
      <Drawer title="Stack history" width={720} onClose={onClose} visible={visible} bodyStyle={{ paddingBottom: 80 }}>
        <HistoryView/>
      </Drawer>
    </>
  );
};
export default Stack;
