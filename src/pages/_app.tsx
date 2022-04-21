import "../../styles/globals.css";
import "../../node_modules/@gouvfr/dsfr/dist/dsfr/dsfr.css";

import { AppProps } from "next/app";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {

  return <Component {...pageProps} />;
}

export default MyApp;
