import { GetServerSidePropsResult } from 'next';
import React from 'react';

import { Head } from '~/client/components/head/Head';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import analytics from '~/pages/formations-initiales/[id].analytics';

export default function ConsulterFormationInitialePage() {
	useAnalytics(analytics);
	useReferrer();
	// FIXME (BRUJ 10-07-2023): Ajouter le titre de la formation
	return (
		<>
			<Head
				title={'test | 1jeune1solution'}
				robots="noindex"
			/>
			<main id="contenu">
			</main>
		</>
	);
};

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Record<never, never>>> {
	const isFormationsInitalesActive = process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE === '1';
	if (!isFormationsInitalesActive) {
		return {
			notFound: true,
		};
	}
	return {
		props: {},
	};
}
