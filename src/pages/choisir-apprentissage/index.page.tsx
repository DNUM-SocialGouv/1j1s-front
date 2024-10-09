import { GetServerSidePropsResult } from 'next';

import {
	CampagneApprentissageJeunes,
} from '~/client/components/features/CampagneApprentissage/CampagneApprentissageJeunes/CampagneApprentissageJeunes';
import { Head } from '~/client/components/head/Head';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useAnalytics from '~/client/hooks/useAnalytics';
import { MarketingService } from '~/client/services/marketing/marketing.service';
import styles from '~/pages/apprentissage/index.module.scss';
import { VideoCampagneApprentissage } from '~/server/campagne-apprentissage/domain/videoCampagneApprentissage';
import { isFailure } from '~/server/errors/either';
import { dependencies } from '~/server/start';

import analyticsPageConfig from './index.analytics';


type ApprentissageJeunesPageProps = {
	videos: VideoCampagneApprentissage[];
}

export default function ApprentissageJeunes(props: ApprentissageJeunesPageProps) {
	useAnalytics(analyticsPageConfig);
	const adformService: MarketingService = useDependency('marketingService');
	adformService.trackPage('2024-10-1jeune1solution.gouv.fr-PageAccueil-PageAccueil');

	return (
		<>
			<Head title="Découvrir et trouver sa voie avec l’apprentissage | 1jeune1solution" robots="index,follow" />
			<main id="contenu" className={styles.contenu}>
				<CampagneApprentissageJeunes videos={props.videos} />
			</main>
		</>
	);
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<ApprentissageJeunesPageProps>> {
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
