import '@gouvfr/dsfr/dist/dsfr/dsfr.css';
import '~/styles/globals.css';

import { AppProps } from 'next/app';
import React, { useEffect } from 'react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import dependenciesContainer from '~/client/dependencies.container';
import { initTracker } from '~/client/utils/tracker.util';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initTracker();
  }, []);

  return (
    <DependenciesProvider dependenciesContainer={dependenciesContainer}>
      <Component {...pageProps} />
    </DependenciesProvider>
  );
}

export default App;
