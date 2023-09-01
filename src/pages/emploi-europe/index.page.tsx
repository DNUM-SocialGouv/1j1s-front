import { GetServerSidePropsResult } from 'next';

import { Head } from '~/client/components/head/Head';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import analytics from '~/pages/emploi-europe/index.analytics';

export default function EmploiEuropePage() {
	useAnalytics(analytics);
	useReferrer();

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
	const featureActivée = process.env.NEXT_PUBLIC_EMPLOIS_EUROPE_FEATURE === '1';

	if (!featureActivée) {
		return { notFound: true };
	}

	return {
		props: {},
	};
}
