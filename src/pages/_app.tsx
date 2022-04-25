import "@gouvfr/dsfr/dist/dsfr/dsfr.css";
import "~/styles/globals.css";

import { init } from "@socialgouv/matomo-next";
import { AppProps } from "next/app";
import React, { useEffect } from "react";

import { DependenciesProvider } from "~/client/context/dependenciesContainer.context";
import dependenciesContainer from "~/client/dependencies.container";

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL || "missing MATOMO URL";
const MATOMO_SITE_ID =
  process.env.NEXT_PUBLIC_MATOMO_SITE_ID || "missing MATOMO SITE ID";

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    init({
      siteId: MATOMO_SITE_ID,
      url: MATOMO_URL,
    });
  }, []);

  return (
    <DependenciesProvider dependenciesContainer={dependenciesContainer}>
      <Component {...pageProps} />
    </DependenciesProvider>
  );
}

export default App;
