import { GetServerSidePropsResult } from 'next';
import React, { useEffect, useState } from 'react';

import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';

import styles from './index.module.scss';

const URL_IFRAME_1JEUNE_1PERMIS = 'https://mes-aides.pole-emploi.fr/export/1-jeune-1-permis';
const DOMAINE_1JEUNE_1PERMIS = 'https://mes-aides.pole-emploi.fr';

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Record<never, never>>> {
	const isFeatureActive = process.env.NEXT_PUBLIC_1JEUNE1PERMIS_FEATURE === '1';

	if (!isFeatureActive) {
		return { notFound: true };
	}

	return {
		props: {},
	};
}

export default function UnJeuneUnPermis() {

	const [iframeHeight, setIframeHeight] = useState<string | undefined>(undefined);

	const onMessage = (event: MessageEvent<{ type: string; size: string }>) => {
		if (event.origin !== DOMAINE_1JEUNE_1PERMIS || typeof event.data !== 'object' || !event.data.type) {
			return;
		}
		if (event.data.type === 'resize-iframe') {
			setIframeHeight(event.data.size);
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
					height={iframeHeight}/>
			</Container>
		</main>
	);
}


