import React from 'react';
import { PageProps } from '../types/Props';

const Home: React.FC<PageProps> = ({setBreadCrumbs}) => {
  React.useEffect(() => {
    setBreadCrumbs(["home"])
  }, [])
  return <div>hello</div>;
};

export default Home;