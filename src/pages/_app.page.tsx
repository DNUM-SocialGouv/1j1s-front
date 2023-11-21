import '~/styles/main.scss';

import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactElement, ReactNode, useEffect, useMemo } from 'react';

import { Layout } from '~/client/components/layouts/Layout';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import dependenciesContainer from '~/client/dependencies.container';
import useReferrer from '~/client/hooks/useReferrer';
import useSessionId from '~/client/hooks/useSessionId';

export type NextPageWithLayout<P = object> = NextPage<P, P> & {
  getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const sessionId = useSessionId();
	const dependenciesContainerInstance = useMemo(() => sessionId && dependenciesContainer(sessionId), [sessionId]);
	const router = useRouter();
	useReferrer();

	useEffect(() => {
		const [/* full path */, targetId] = router.asPath.match(/^[^#]*#(.+)$/) ?? [];
		if (targetId) {
			document.getElementById(targetId)?.focus();
		}
	}, [router.asPath, sessionId]);

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
				dependenciesContainerInstance && (
					<DependenciesProvider {...dependenciesContainerInstance}>
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
