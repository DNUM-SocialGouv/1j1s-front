import { GetServerSidePropsResult } from 'next';

import {
	CampagneApprentissageEntreprises,
} from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/CampagneApprentissageEntreprises';
import { Head } from '~/client/components/head/Head';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import analyticsPageConfig from '~/pages/apprentissage-entreprises/index.analytics';
import { VideoCampagneApprentissage } from '~/server/cms/domain/videoCampagneApprentissage.type';
import { isFailure } from '~/server/errors/either';
import { dependencies } from '~/server/start';

type ApprentissageEntreprisesPageProps = {
	videos: VideoCampagneApprentissage[];
}

export default function ApprentissageEntreprises ({ videos }: ApprentissageEntreprisesPageProps) {
	useReferrer();
	useAnalytics(analyticsPageConfig);

	return (
		<>
			<Head title="Découvrir les avantages de l’apprentissage pour les entreprises | 1jeune1solution" robots="index,follow" />
			<main id="contenu">
				<CampagneApprentissageEntreprises videos={videos}/>
			</main>
		</>
	);
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<ApprentissageEntreprisesPageProps>> {
	const videos = await dependencies.cmsDependencies.recupererVideosCampagneApprentissage.handle();
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
