import { GetServerSidePropsResult } from 'next';
import React, { useEffect, useRef, useState } from 'react';

import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import useAnalytics from '~/client/hooks/useAnalytics';

import analyticsPageConfig from './index.analytics';
import styles from './index.module.scss';

const URL_IFRAME_1JEUNE_1PERMIS = 'https://mes-aides.pole-emploi.fr/export/1-jeune-1-permis';
const DOMAINE_1JEUNE_1PERMIS = 'https://mes-aides.pole-emploi.fr';

export async function getStaticProps(): Promise<GetServerSidePropsResult<Record<never, never>>> {
	const isFeatureActive = process.env.NEXT_PUBLIC_1JEUNE1PERMIS_FEATURE === '1';

	if (!isFeatureActive) {
		return { notFound: true };
	}

	return {
		props: {},
	};
}

interface EventMessage { type: string; height: number }
export default function UnJeuneUnPermis() {

	useAnalytics(analyticsPageConfig);
	const [iframeHeight, setIframeHeight] = useState<number | undefined>(undefined);
	const iRef = useRef<HTMLIFrameElement>(null);

	const onMessage = (event: MessageEvent<string>) => {
		let data: EventMessage;
		try {
			data = JSON.parse(event.data) as EventMessage;
		} catch {
			return;
		}
		if (event.origin !== DOMAINE_1JEUNE_1PERMIS || typeof data !== 'object' || data.type !== 'resize-iframe') {
			return;
		}
		if (data.type === 'resize-iframe') {
			setIframeHeight(data.height);
		}
	};

	useEffect(() => {
		window.addEventListener(
			'message',
			onMessage,
		);

		return () => {
			window.removeEventListener('message', onMessage);
		};
	});

	setInterval(() => {
		// Polling pour déclencher l'envoi de la taille de l'iframe
		(iRef.current?.contentWindow)?.postMessage('size-request', '*');
	}, 100);

	return (
		<main id="contenu">
			<Head
				title={'1jeune1permis | 1jeune1solution'}
				robots="index,follow"
			/>
			<Container>
				<iframe className={styles.iframe}
					title="Informations sur le dispositif 1 jeune 1 permis"
					src={URL_IFRAME_1JEUNE_1PERMIS}
					height={iframeHeight}
					ref={iRef}/>
			</Container>
		</main>
	);
}


