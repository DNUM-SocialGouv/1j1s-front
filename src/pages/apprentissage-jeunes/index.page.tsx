import { GetServerSidePropsResult } from 'next';

import { CampagneApprentissage } from '~/client/components/features/CampagneApprentissage/CampagneApprentissage';
import { Head } from '~/client/components/head/Head';

export default function ApprentissageJeunes () {

	return (
		<>
			<Head title="Découvrir et trouver sa voie avec l’apprentissage | 1jeune1solution" robots="index,follow" />
			<CampagneApprentissage/>
		</>
	);
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Record<never, never>>> {
	const featureActivated = process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE === '1';
	if (!featureActivated) {
		return {
			notFound: true,
		};
	}
	return {
		props: {},
	};
}
