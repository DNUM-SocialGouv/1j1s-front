import { GetServerSidePropsResult } from 'next';

import { Head } from '~/client/components/head/Head';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/emplois-europe/index.analytics';

export default function EmploiEuropePage() {
	useAnalytics(analytics);

	return <>
		<Head
			title={'Rechercher un emploi en Europe | 1jeune1solution'}
			description="Des milliers d’offres d’emplois en Europe sélectionnées pour vous par EURES"
			robots="index,follow"
		/>
		<main id="contenu">
			<LightHero>
				<h1>
					<LightHeroPrimaryText>Des milliers d‘offres d‘emplois en Europe</LightHeroPrimaryText>
					<LightHeroSecondaryText>sélectionnées pour vous par EURES</LightHeroSecondaryText>
				</h1>
			</LightHero>
		</main>
	</>;
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Record<never, never>>> {
	const isFeatureActive = process.env.NEXT_PUBLIC_EMPLOIS_EUROPE_FEATURE === '1';

	if (!isFeatureActive) {
		return { notFound: true };
	}

	return {
		props: {},
	};
}
