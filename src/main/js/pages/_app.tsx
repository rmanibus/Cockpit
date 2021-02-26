import 'styles/globals.css';
import React from 'react';
import type { AppProps, AppContext, AppInitialProps } from 'next/app';
import { BaseLayout, Header } from 'components/BaseLayout';
import { DataContextProvider } from 'contexts/DataContext';
import { StackContextProvider } from 'contexts/StackContext';

export const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [header, setHeader] = React.useState<Header>({title: "", breadcrumb: []});
  return (
    <DataContextProvider>
      <StackContextProvider>
        <BaseLayout header={header}>
          <Component {...pageProps} setHeader={setHeader} />
        </BaseLayout>
      </StackContextProvider>
    </DataContextProvider>
  );
};

export default MyApp;
