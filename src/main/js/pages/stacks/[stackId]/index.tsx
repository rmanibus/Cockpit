import React from 'react';
import { StackView } from '../../../components/views/StackView';
import { StackContext, StackContextValue } from '../../../contexts/StackContext';
import { DataContext, DataContextValue } from '../../../contexts/DataContext';
import { PageProps } from '../../../types/Props';

const Stack: React.FC<PageProps> = ({setHeader}) => {
  const { data, type } = React.useContext<DataContextValue>(DataContext);
  const { stack } = React.useContext<StackContextValue>(StackContext);
  React.useEffect(() => {
    data && type === "stack" && setHeader({title: data.name, breadcrumb: 
    [
        {path: "/", breadcrumbName: "Home"}, 
        {path: "/stacks", breadcrumbName: "Stacks"},
        {path: "/stacks/" + data.id, breadcrumbName: data.name}
    ]})

  }, [data, type])
  return (
    <>
      {stack && <StackView />}
    </>
  );
};
export default Stack;
