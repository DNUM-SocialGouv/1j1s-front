import { GetServerSidePropsResult } from 'next';

import { CampagneApprentissageJeunes } from '~/client/components/features/CampagneApprentissage/CampagneApprentissageJeunes/CampagneApprentissageJeunes';
import { Head } from '~/client/components/head/Head';
import useReferrer from '~/client/hooks/useReferrer';

export default function ApprentissageJeunes() {
	useReferrer();

	return (
		<>
			<Head title="Découvrir et trouver sa voie avec l’apprentissage | 1jeune1solution" robots="index,follow"/>
			<main id="contenu">
				<CampagneApprentissageJeunes/>
			</main>
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
