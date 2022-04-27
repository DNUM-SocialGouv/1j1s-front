import '@gouvfr/dsfr/dist/dsfr/dsfr.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.css';
import '~/styles/globals.css';

import { SkiplinkItem, Skiplinks } from '@dataesr/react-dsfr';
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
      <Skiplinks>
        <SkiplinkItem href="#contenu">Contenu</SkiplinkItem>
        <SkiplinkItem href="#header-navigation">Menu</SkiplinkItem>
        <SkiplinkItem href="#footer">Pied de page</SkiplinkItem>
      </Skiplinks>
      <Component {...pageProps} />
    </DependenciesProvider>
  );
}

export default App;
