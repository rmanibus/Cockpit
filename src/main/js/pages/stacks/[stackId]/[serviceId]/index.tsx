import React from 'react';
import { ServiceEditor } from '../../../../components/editors/ServiceEditor';
import { StackContext, StackContextValue } from '../../../../contexts/StackContext';
import { PageProps } from '../../../../types/Props';
import { DataContext, DataContextValue } from '../../../../contexts/DataContext';

const Service: React.FC<PageProps> = ({setBreadCrumbs}) => {
    const { data, type } = React.useContext<DataContextValue>(DataContext);
    const { stack, serviceId, updateService } = React.useContext<StackContextValue>(StackContext);

    React.useEffect(() => {
        data && type === "stack" && setBreadCrumbs(["home", "stacks", data.name, serviceId])
      }, [data, type])

    return(
        <>
       {stack && <ServiceEditor update={updateService(serviceId)} name={serviceId} service={stack.services[serviceId]} />}
        </>
    );
}
export default Service;