import { GetServerSidePropsResult } from 'next';
import { useEffect } from 'react';

import {
	CampagneApprentissageEntreprises,
} from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/CampagneApprentissageEntreprises';
import { Head } from '~/client/components/head/Head';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useAnalytics from '~/client/hooks/useAnalytics';
import { MarketingService } from '~/client/services/marketing/marketing.service';
import analyticsPageConfig from '~/pages/apprentissage-entreprises/index.analytics';
import { VideoCampagneApprentissage } from '~/server/campagne-apprentissage/domain/videoCampagneApprentissage';
import { isFailure } from '~/server/errors/either';
import { dependencies } from '~/server/start';

type ApprentissageEntreprisesPageProps = {
	videos: VideoCampagneApprentissage[];
}

export default function ApprentissageEntreprises ({ videos }: ApprentissageEntreprisesPageProps) {
	useAnalytics(analyticsPageConfig);
	const adformService: MarketingService = useDependency('marketingService');
	adformService.trackPage('2024-09-1jeune1solution.gouv.fr-PageAccueil-PageAccueil');
	const seedtagService: MarketingService = useDependency('seedtagService');
	useEffect(() => {
		seedtagService.trackPage('');
	}, [seedtagService]);


	return (
		<>
			<Head title="Découvrir les avantages de l’apprentissage pour les entreprises | 1jeune1solution" robots="index,follow" />
			<main id="contenu">
				<CampagneApprentissageEntreprises videos={videos} />
			</main>
		</>
	);
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<ApprentissageEntreprisesPageProps>> {
	const videos = await dependencies.campagneApprentissageDependencies.recupererVideosCampagneApprentissageUseCase.handle();
	if (isFailure(videos)) {
		return {
			props: {
				videos: [],
			},
		};
	}

	return {
		props: {
			videos: videos.result,
		},
	};
}
