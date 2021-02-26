import React from 'react';
import api from 'api';
import { StackContext, StackContextValue } from 'contexts/StackContext';
import { Timeline, message } from 'antd';

export const HistoryView: React.FC = () => {
  const { stackId } = React.useContext<StackContextValue>(StackContext);
  const [history, setHistory] = React.useState([]);
  React.useEffect(() => {
    api
      .get('stacks/' + stackId + '/history')
      .then((res) => {
        setHistory(res.data);
      })
      .catch(() => {
        message.error('failed to fetch history');
      });
  }, [stackId]);
  return (
    <Timeline>
      {history.map((item) => (
        <Timeline.Item>{item.name} {item.id}</Timeline.Item>
      ))}
    </Timeline>
  );
};
