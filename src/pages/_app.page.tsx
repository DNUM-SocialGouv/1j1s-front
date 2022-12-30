import '~/styles/globals.css';
import '~/styles/main.scss';

import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { ReactElement, ReactNode } from 'react';

import { Layout } from '~/client/components/layouts/Layout';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import dependenciesContainer from '~/client/dependencies.container';
import useSessionId from '~/client/hooks/useSessionId';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const sessionId = useSessionId();
  
	const getLayout = Component.getLayout ?? defaultLayout;
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, height=device-height, initial-scale=1, viewport-fit=cover, minimum-scale=1.0"
				/>
				<meta name="description" content="Toutes les solutions pour l‘avenir des jeunes"/>
			</Head>
			{
				sessionId && (
					<DependenciesProvider {...dependenciesContainer(sessionId)}>
						{getLayout(<Component {...pageProps} />)}
					</DependenciesProvider>
				)
			}
		</>
	);
}
function defaultLayout(page: ReactElement) {
	return (
		<Layout>{page}</Layout>
	);
}
