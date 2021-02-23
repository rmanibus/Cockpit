import React from 'react';
import { Drawer } from 'antd';
import { StacksView } from '../../components/views/StacksView';
import { CreateStackForm } from '../../components/forms/StackForm'
import { DataContext } from '../../contexts/DataContext';
import { PageProps } from '../../types/Props';

const Stacks: React.FC<PageProps> = ({setBreadCrumbs}) => {
    const { setPath, type } = React.useContext(DataContext);
    const [visible, setVisible] = React.useState(false);

    const addItem = () => {
        setVisible(true);
    }

    const onClose = () => {
        setVisible(false);
    }

    React.useEffect(() => {
        setBreadCrumbs(["home", "stacks"])
        setPath({context:'stacks'});
    }, []);

    return(
        <>
        { type === "Array<stack>" && <StacksView addItem={addItem}/> }
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