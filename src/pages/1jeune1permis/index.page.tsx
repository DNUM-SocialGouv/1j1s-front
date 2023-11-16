import { GetServerSidePropsResult } from 'next';
import React, { useEffect, useRef, useState } from 'react';

import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';

import styles from './index.module.scss';

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

	const onMessage = (ev: MessageEvent<{ type: string; size: string }>) => {
		if (typeof ev.data !== 'object') return;
		if (!ev.data.type) return;
		if (ev.data.type === 'resize-iframe') {
			setIframeHeight(ev.data.size);
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
				<iframe className={styles.iframe} src={'/1jeune1permis/iframe'} height={iframeHeight}>

				</iframe>
				{/*<iframe className={styles.iframe}
					title="Informations sur le dispositif 1 jeune 1 permis"
					src={'https://mes-aides.pole-emploi.fr/export/1-jeune-1-permis'}/>*/}
			</Container>
		</main>
	);
}


