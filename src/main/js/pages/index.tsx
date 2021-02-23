import React from 'react';
import { PageProps } from '../types/Props';
import { Breadcrumb, PageHeader } from 'antd';

const Home: React.FC<PageProps> = ({setHeader}) => {
  React.useEffect(() => {
    setHeader({title: "Home", breadcrumb: [
      {path: "/", breadcrumbName: "Home"}
    ]})
  }, [])
  return <div></div>;
};

export default Home;