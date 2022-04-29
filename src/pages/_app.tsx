import '@gouvfr/dsfr/dist/dsfr/dsfr.css';
import '@gouvfr/dsfr/dist/utility/icons/icons-map/icons-map.css';
import '@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.css';
import '~/styles/globals.css';

import { SkiplinkItem, Skiplinks } from '@dataesr/react-dsfr';
import { AppProps } from 'next/app';
import React, { useEffect } from 'react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import dependenciesContainer from '~/client/dependencies.container';
import useSessionId from '~/client/hooks/useSessionId';
import { initTracker } from '~/client/utils/tracker.util';

function App({ Component, pageProps }: AppProps) {
  const sessionId = useSessionId();
  useEffect(() => {
    initTracker();
  }, []);

  return (
    <DependenciesProvider dependenciesContainer={dependenciesContainer(sessionId!)}>
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
