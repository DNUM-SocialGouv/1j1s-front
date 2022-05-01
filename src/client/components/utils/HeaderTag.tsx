import Head from 'next/head';
import React from 'react';

interface HeadTagProps {
  title: string
  description?: string
}

export function HeadTag({ title, description }: HeadTagProps) {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Head>
  );
}
