import React from 'react';
import { Drawer, Button, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SourcesView } from 'components/views/SourcesView';
import { CreateSourceForm } from 'components/forms/SourceForm'
import { DataContext } from 'contexts/DataContext';
import { PageProps } from 'types/Props';

const Sources: React.FC<PageProps> = ({setHeader}) => {
    const { setPath, type, loading } = React.useContext(DataContext);
    const [visible, setVisible] = React.useState(false);
    const addItem = () => {
        setVisible(true);
    }

    const onClose = () => {
        setVisible(false);
    }

    React.useEffect(() => {
        setHeader({
            title: "Sources", 
            extra: <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={addItem} />,
            breadcrumb: [
                {path: "/", breadcrumbName: "Home"}, 
                {path: "/sources", breadcrumbName: "Sources"}
        ]})
        setPath({context:'sources'});
    }, []);

    return(
        <Spin spinning={loading}>
            {type === "Array<source>" && <SourcesView/>}
        <Drawer
        title="Create a new Source"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <CreateSourceForm afterFinish={onClose} />
      </Drawer>
      </Spin>
    );
}
export default Sources;