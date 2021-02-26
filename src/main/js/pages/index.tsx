import React from 'react';
import { PageProps } from 'types/Props';

const Home: React.FC<PageProps> = ({setHeader}) => {
  React.useEffect(() => {
    setHeader({title: "Home", breadcrumb: [
      {path: "/", breadcrumbName: "Home"}
    ]})
  }, [])
  return <div></div>;
};

export default Home;