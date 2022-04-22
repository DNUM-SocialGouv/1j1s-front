import "../../styles/globals.css";
import "../../node_modules/@gouvfr/dsfr/dist/dsfr/dsfr.css";

import { init } from "@socialgouv/matomo-next";
import { AppProps } from "next/app";
import React, { useEffect } from "react";

import { DependenciesProvider } from "../client/context/dependenciesContainerContext";
import dependenciesContainer from "../client/dependencies.container";

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    init({ siteId: MATOMO_SITE_ID, url: MATOMO_URL });
  }, []);

  return (
    <DependenciesProvider dependenciesContainer={dependenciesContainer}>
      <Component {...pageProps} />
    </DependenciesProvider>
  );
}

export default App;
