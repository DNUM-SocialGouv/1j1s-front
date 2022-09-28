import '~/styles/globals.css';
import '~/styles/main.scss';

import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import { Layout } from '~/client/components/layouts/Layout';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import dependenciesContainer from '~/client/dependencies.container';
import useSessionId from '~/client/hooks/useSessionId';

export default function App({ Component, pageProps }: AppProps) {
  const sessionId = useSessionId();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1, viewport-fit=cover, minimum-scale=1.0"
        />
        <meta name="description" content="Toutes les solutions pour l'avenir des jeunes"/>
      </Head>
      {
        sessionId && (
          <DependenciesProvider {...dependenciesContainer(sessionId)}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </DependenciesProvider>
        )
      }
    </>
  );
}
