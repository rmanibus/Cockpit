import React from 'react';
import { StackView } from '../../../components/views/StackView';
import { StackContext, StackContextValue } from '../../../contexts/StackContext';
import { DataContext, DataContextValue } from '../../../contexts/DataContext';
import { PageProps } from '../../../types/Props';

const Stack: React.FC<PageProps> = ({setBreadCrumbs}) => {
  const { data, type } = React.useContext<DataContextValue>(DataContext);
  const { stack } = React.useContext<StackContextValue>(StackContext);
  React.useEffect(() => {
    data && type === "stack" && setBreadCrumbs(["home", "stacks", data.name])
  }, [data, type])
  return (
    <>
      {stack && <StackView />}
    </>
  );
};
export default Stack;
