import { GetServerSidePropsResult } from 'next';

import {
	CampagneApprentissageJeunes,
} from '~/client/components/features/CampagneApprentissage/CampagneApprentissageJeunes/CampagneApprentissageJeunes';
import { Head } from '~/client/components/head/Head';
import useAnalytics from '~/client/hooks/useAnalytics';
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
