import React from 'react';
import { List, Button, Tag, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import api from '../../api';
import { sourceTypes } from '../../translations/Source';
import { DataContext } from '../../contexts/DataContext';
type SourceViewProps = {
  addItem: any;
};

export const SourcesView: React.FC<SourceViewProps> = ({ addItem }) => {

  const { listData, remove } = React.useContext(DataContext);
  const onRemoveClick = (id) => () => {
    remove(id)
    .then(() => message.success('source removed !'))
    .catch(() => message.error('failed to remove source'))
    ;
  }

  return (
    <>
      <Button style={{ float: 'right' }} type="primary" shape="circle" icon={<PlusOutlined />} onClick={addItem} />
      <h2>Sources</h2>
      <List
        itemLayout="horizontal"
        dataSource={listData}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <>
                  <Tag color={sourceTypes[item.type].color}>{sourceTypes[item.type].text}</Tag>
                  {item.name}
                </>
              }
              description={'location: ' + item.location}
            />
            <Button shape="circle" danger onClick={onRemoveClick(item.id)} icon={<DeleteOutlined />} />
          </List.Item>
        )}
      />
    </>
  );
};
