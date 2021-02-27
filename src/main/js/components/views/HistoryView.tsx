import React from 'react';
import api from 'api';
import { StackContext, StackContextValue } from 'contexts/StackContext';
import { Spin, Timeline, Typography, message } from 'antd';
const { Text, Link } = Typography;
import moment from "moment";

export const HistoryView: React.FC = () => {
  const { stackId } = React.useContext<StackContextValue>(StackContext);
  const [history, setHistory] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    api
      .get('stacks/' + stackId + '/history')
      .then((res) => {
        setHistory(res.data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(() => {
        message.error('failed to fetch history');
      });
  }, [stackId]);
  return (
    <Spin spinning={loading}>
    <Timeline mode="right">
      {history.map((item) => (
        <Timeline.Item label={moment(item.date).format("LLLL")}>
          {item.message}
          <br />
          {item.author.name} ({item.author.email})
          <br />
          <Text type="secondary">{item.id}</Text>
        </Timeline.Item>
      ))}
    </Timeline>
    </Spin>
  );
};
