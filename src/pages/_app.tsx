import '@gouvfr/dsfr/dist/dsfr/dsfr.css';
import '@gouvfr/dsfr/dist/utility/icons/icons-map/icons-map.css';
import '~/styles/globals.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';

import { Layout } from '~/client/components/layouts/Layout';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import dependenciesContainer from '~/client/dependencies.container';
import useSessionId from '~/client/hooks/useSessionId';
import { initTracker } from '~/client/utils/tracker.util';

export default function App({ Component, pageProps }: AppProps) {
  const sessionId = useSessionId();

  useEffect(() => {
    initTracker();
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1, viewport-fit=cover, minimum-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Layout>
        {
          sessionId && (
            <DependenciesProvider {...dependenciesContainer(sessionId)}>
              <Component {...pageProps} />
            </DependenciesProvider>
          )
        }
      </Layout>
    </>
  );
}
