import React from 'react';
import { List, Button, Tag, message, Drawer } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { EditSourceForm } from '../forms/SourceForm';
import { sourceTypes } from '../../translations/Source';
import { DataContext } from '../../contexts/DataContext';
import { Source } from '../../types/Source';

type SourceViewProps = {
  addItem: any;
};

export const SourcesView: React.FC<SourceViewProps> = ({ addItem }) => {
  const { listData, remove } = React.useContext(DataContext);
  const onRemoveClick = (id) => () => {
    remove(id)
      .then(() => message.success('source removed !'))
      .catch(() => message.error('failed to remove source'));
  };

  return (
    <>
      <Button style={{ float: 'right' }} type="primary" shape="circle" icon={<PlusOutlined />} onClick={addItem} />
      <h2>Sources</h2>
      <List itemLayout="horizontal" dataSource={listData} renderItem={(item) => <SourcesItem item={item} />} />
    </>
  );
};

type SourcesItemProps = {
  item: Source;
};
export const SourcesItem: React.FC<SourcesItemProps> = ({ item }) => {
  const { remove } = React.useContext(DataContext);

  const [visible, setVisible] = React.useState(false);
  const closeDrawer = () => {
      setVisible(false);
  }

  const onRemove = () => {
    remove(item.id)
      .then(() => message.success('source removed !'))
      .catch(() => message.error('failed to remove source'));
  };
  const onEdit = () => {
    setVisible(true);
  };
  return (
    <List.Item>
      <List.Item.Meta
        onClick={onEdit}
        title={
          <>
            <Tag color={sourceTypes[item.type].color}>
              {React.createElement(sourceTypes[item.type].icon)} {sourceTypes[item.type].text}
            </Tag>
            {item.name}
          </>
        }
        description={'location: ' + item.location}
      />
      <Button shape="circle" danger onClick={onRemove} icon={<DeleteOutlined />} />
      <Drawer title={"Edit Source " + item.name } width={720} onClose={closeDrawer} destroyOnClose visible={visible} bodyStyle={{ paddingBottom: 80 }}>
          <EditSourceForm afterFinish={closeDrawer} id={item.id} />
      </Drawer>
    </List.Item>
  );
};
