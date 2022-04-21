import "../../styles/globals.css";
import "../../node_modules/@gouvfr/dsfr/dist/dsfr/dsfr.css";

import { AppProps } from "next/app";
import React from "react";

import { DependenciesProvider } from "../client/context/dependenciesContainerContext";
import dependenciesContainer from "../client/dependencies.container";

function App({ Component, pageProps }: AppProps) {
  return (
    <DependenciesProvider dependenciesContainer={dependenciesContainer}>
      <Component {...pageProps} />
    </DependenciesProvider>
  );
}

export default App;
