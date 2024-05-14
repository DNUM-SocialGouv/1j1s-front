import '~/styles/main.scss';

import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';

import ErrorServer from '~/client/components/layouts/Error/ErrorServer';
import { Layout } from '~/client/components/layouts/Layout';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import dependenciesContainer from '~/client/dependencies.container';
import usePageHistory from '~/client/hooks/usePageHistory';
import useSessionId from '~/client/hooks/useSessionId';

export type NextPageWithLayout<P = object> = NextPage<P, P> & {
  getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const sessionId = useSessionId();

	/* isClientSide permet de générer l'essentiel de la page uniquement côté client
	 Il est nécessaire pour le moment car la codebase contient toujours des appels à des méthodes comme useBreakpoint
	 qui causent des hydration mismatch = différence de rendu entre serveur et premier chargement du JS côté client
	La suppression de isClientSide permettra un rendu SSR / SSG complet */
	const [isClientSide, setIsClientSide] = useState(false);
	useEffect(() => {
		setIsClientSide(true);
	}, []);

	const dependenciesContainerInstance = useMemo(() => isClientSide && dependenciesContainer(sessionId), [isClientSide, sessionId]);
	const router = useRouter();

	usePageHistory();

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
						{getLayout(
							pageProps.error
								? <ErrorServer error={pageProps.error} />
								: <Component {...pageProps} />,
						)}
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
