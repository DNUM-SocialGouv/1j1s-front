import { GetServerSidePropsResult } from 'next';
import React from 'react';

import { Head } from '~/client/components/head/Head';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import analytics from '~/pages/jobs-ete/index.analytics';

export default function JobsEtePage() {
	useAnalytics(analytics);
	useReferrer();

	return (
		<>
			<Head
				title="Rechercher un job d‘été | 1jeune1solution"
				description="Des milliers de jobs d‘été sélectionnés pour vous"
				robots="index,follow"
			/>
			<main id="contenu">
				<LightHero>
					<h1>
						<LightHeroPrimaryText>Des milliers de jobs d‘été</LightHeroPrimaryText>
						<LightHeroSecondaryText>sélectionnés pour vous par Pôle Emploi</LightHeroSecondaryText>
					</h1>
				</LightHero>
			</main>
		</>
	);
};

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Record<never, never>>> {
	const isJobsEteActive = process.env.NEXT_PUBLIC_JOB_ETE_FEATURE === '1';
	if (!isJobsEteActive) {
		return {
			notFound: true,
		};
	}
	return {
		props: {},
	};
}
