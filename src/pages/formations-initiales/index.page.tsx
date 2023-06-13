import { GetServerSidePropsResult } from 'next';
import React from 'react';

import { Head } from '~/client/components/head/Head';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import analytics from '~/pages/formations-initiales/index.analytics';

export default function FormationsInitialesPage() {
	useAnalytics(analytics);
	useReferrer();
	return (
		<>
			<Head
				title="Rechercher une formation initiale| 1jeune1solution"
				description="Des milliers de formations pour vous permettre de réaliser votre projet professionnel"
				robots="index,follow"
			/>
			<main id="contenu">
				<LightHero>
					<h1>
						<LightHeroPrimaryText>Des milliers de formations pour vous permettre</LightHeroPrimaryText>
						<LightHeroSecondaryText>de réaliser votre projet professionnel</LightHeroSecondaryText>
					</h1>
				</LightHero>
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
