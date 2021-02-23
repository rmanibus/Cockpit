import React from 'react';
import { ServiceEditor } from '../../../../components/editors/ServiceEditor';
import { StackContext, StackContextValue } from '../../../../contexts/StackContext';
import { DataContext, DataContextValue } from '../../../../contexts/DataContext';
import { PageProps } from '../../../../types/Props';

const Service: React.FC<PageProps> = ({setHeader}) => {
    const { data, type } = React.useContext<DataContextValue>(DataContext);
    const { stack, serviceId, update } = React.useContext<StackContextValue>(StackContext);

    React.useEffect(() => {
        data && type === "stack" && setHeader({title: serviceId, breadcrumb: 
        [
            {path: "/", breadcrumbName: "Home"}, 
            {path: "/stacks", breadcrumbName: "Stacks"},
            {path: "/stacks/" + data.id, breadcrumbName: data.name},
            {path: "/stacks/" + data.id + "/" + serviceId, breadcrumbName: serviceId}
        ]})
      }, [data, type])

    return(
        <>
       {stack && <ServiceEditor name={serviceId} service={stack.services[serviceId]} />}
        </>
    );
}
export default Service;