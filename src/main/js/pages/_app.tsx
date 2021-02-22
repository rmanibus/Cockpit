import '../styles/globals.css'
import React from 'react';
import type { AppProps, AppContext, AppInitialProps } from 'next/app';
import { BaseLayout } from '../components/BaseLayout';
import { DataContextProvider } from '../contexts/DataContext';

export const MyApp:  React.FC<AppProps> = ({ Component, pageProps }) => {

  return (
    <DataContextProvider>
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
    </DataContextProvider>
    )
}

export default MyApp
