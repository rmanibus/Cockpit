import React from 'react';
import { Drawer, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { StacksView } from '../../components/views/StacksView';
import { CreateStackForm } from '../../components/forms/StackForm'
import { DataContext } from '../../contexts/DataContext';
import { PageProps } from '../../types/Props';


const Stacks: React.FC<PageProps> = ({setHeader}) => {
    const { setPath, type } = React.useContext(DataContext);
    const [visible, setVisible] = React.useState(false);

    const addItem = () => {
        setVisible(true);
    }

    const onClose = () => {
        setVisible(false);
    }

    React.useEffect(() => {
        setHeader({
            title: "Stacks",
            extra: <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={addItem} />,
            breadcrumb: [
                {path: "/", breadcrumbName: "Home"}, 
                {path: "/stacks", breadcrumbName: "Stacks"}
        ]})
        setPath({context:'stacks'});
    }, []);

    return(
        <>
        { type === "Array<stack>" && <StacksView/> }
        <Drawer
        title="Create a new Stack"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <CreateStackForm afterFinish={onClose} />
      </Drawer>
      </>
    );
}
export default Stacks;