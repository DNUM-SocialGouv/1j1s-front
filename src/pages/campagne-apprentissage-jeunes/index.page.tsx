import { GetServerSidePropsResult } from 'next';

export default function CampagneApprentissageJeunes () {

	return <h1>Campagne Apprentissage Jeunes</h1>;
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Record<never, never>>> {
	const featureFlip = process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE === '1';
	if (!featureFlip) {
		return {
			notFound: true,
		};
	}
	return {
		props: {},
	};
}
