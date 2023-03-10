import React from 'react';

import RechercherFormation from '~/client/components/features/Formation/Rechercher/RechercherFormation';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';

export default function FormationAlternancePage() {
	useAnalytics('formations/apprentissage');
	useReferrer();

	return (
		<RechercherFormation/>
	);
};

export async function getServerSideProps() {
	const isFormationActive = process.env.NEXT_PUBLIC_FORMATION_LBA_FEATURE === '1';
	if (!isFormationActive) {
		return { notFound: true };
	}

	return {
		props: {},
	};
}
