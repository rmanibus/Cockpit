import '../styles/globals.css'
import React from 'react';
import type { AppProps, AppContext, AppInitialProps } from 'next/app';
import { BaseLayout } from '../components/BaseLayout';

export const MyApp:  React.FC<AppProps> = ({ Component, pageProps }) => {

  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>)
}

export default MyApp
