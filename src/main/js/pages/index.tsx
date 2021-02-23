import React from 'react';
import { PageProps } from '../types/Props';
import { PageHeader } from 'antd';

const Home: React.FC<PageProps> = ({setBreadCrumbs}) => {
  React.useEffect(() => {
    setBreadCrumbs(["home"])
  }, [])
  return <PageHeader title="Home" />;
};

export default Home;