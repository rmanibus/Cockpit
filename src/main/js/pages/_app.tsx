import '../styles/globals.css';
import React from 'react';
import type { AppProps, AppContext, AppInitialProps } from 'next/app';
import { BaseLayout } from '../components/BaseLayout';
import { DataContextProvider } from '../contexts/DataContext';
import { StackContextProvider } from '../contexts/StackContext';

export const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [breadCrumbs, setBreadCrumbs] = React.useState<Array<string>>([]);
  return (
    <DataContextProvider>
      <StackContextProvider>
        <BaseLayout breadCrumbs={breadCrumbs}>
          <Component {...pageProps} setBreadCrumbs={setBreadCrumbs} />
        </BaseLayout>
      </StackContextProvider>
    </DataContextProvider>
  );
};

export default MyApp;
