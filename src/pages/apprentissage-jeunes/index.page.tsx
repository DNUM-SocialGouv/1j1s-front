import { GetServerSidePropsResult } from 'next';

import {
	CampagneApprentissageJeunes,
} from '~/client/components/features/CampagneApprentissage/CampagneApprentissageJeunes/CampagneApprentissageJeunes';
import { Head } from '~/client/components/head/Head';
import useReferrer from '~/client/hooks/useReferrer';
import { VideoCampagneApprentissage } from '~/server/cms/domain/videoCampagneApprentissage.type';
import { isFailure } from '~/server/errors/either';
import { dependencies } from '~/server/start';

type ApprentissageJeunesPageProps = {
	videos: VideoCampagneApprentissage[];
}

export default function ApprentissageJeunes(props: ApprentissageJeunesPageProps) {
	useReferrer();

	return (
		<>
			<Head title="Découvrir et trouver sa voie avec l’apprentissage | 1jeune1solution" robots="index,follow"/>
			<main id="contenu">
				<CampagneApprentissageJeunes videos={props.videos}/>
				{/*<ul>*/}
				{/*	{props.videos?.map((video) => (*/}
				{/*		<li key={video.videoId}>*/}
				{/*			<iframe */}
				{/*				width="560" */}
				{/*				height="315" */}
				{/*				src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}*/}
				{/*				title="YouTube video player"*/}
				{/*				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
				{/*				allowFullScreen/>*/}
				{/*		</li>*/}
				{/*	))}*/}
				{/*</ul>*/}
			</main>
		</>
	);
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<ApprentissageJeunesPageProps>> {
	const featureActivated = process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE === '1';
	if (!featureActivated) {
		return {
			notFound: true,
		};
	}

	const videos = await dependencies.cmsDependencies.récupérerVidéosCampagneApprentissage.handle();
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
