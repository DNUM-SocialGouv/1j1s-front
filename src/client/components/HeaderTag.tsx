import Head from 'next/head';
import React from 'react';

type HeadProps = {
  title: string;
  description: string;
};

export const HeadTag = ({ title, description }: HeadProps) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="shortcut icon" href="/favicon.ico" />
  </Head>
);
