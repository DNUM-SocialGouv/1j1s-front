import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta charSet="utf-8"/>
        <meta name="author" content="1jeune1solution"/>
        <meta name="robots" content="index,follow"/>
        <link rel="shortcut icon" href="/favicons/favicon.ico"/>
      </Head>
      <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  );
}
