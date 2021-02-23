import React from 'react';
import { List, Button, Tag, message, Drawer, PageHeader } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { EditSourceForm } from '../forms/SourceForm';
import { sourceTypes } from '../../translations/Source';
import { DataContext } from '../../contexts/DataContext';
import { Source } from '../../types/Source';

type SourcesViewProps = {
  addItem: any;
};
export const SourcesView: React.FC<SourcesViewProps> = ({ addItem }) => {
  const { listData } = React.useContext(DataContext);
  return (
    <>
      <Button style={{ float: 'right' }} type="primary" shape="circle" icon={<PlusOutlined />} onClick={addItem} />
      <List itemLayout="horizontal" dataSource={listData} renderItem={(item) => <SourceItem item={item} />} />
    </>
  );
};
type SourceItemProps = {
  item: Source;
};
export const SourceItem: React.FC<SourceItemProps> = ({ item }) => {
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
