import React from 'react';
import { Drawer, Button, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DockersView } from 'components/views/DockersView';
import { CreateDockerForm } from 'components/forms/DockerForm'
import { DataContext } from 'contexts/DataContext';
import { PageProps } from 'types/Props';

const Dockers: React.FC<PageProps> = ({setHeader}) => {
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
            title: "Dockers", 
            extra: <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={addItem} />,
            breadcrumb: [
                {path: "/", breadcrumbName: "Home"}, 
                {path: "/dockers", breadcrumbName: "Dockers"}
        ]})
        setPath({context:'dockers'});
    }, []);

    return(
        <Spin spinning={loading}>
            {type === "Array<docker>" && <DockersView/>}
        <Drawer
        title="Create a new Docker"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <CreateDockerForm afterFinish={onClose} />
      </Drawer>
      </Spin>
    );
}
export default Dockers;