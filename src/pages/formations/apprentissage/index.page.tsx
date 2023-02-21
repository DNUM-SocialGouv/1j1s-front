import React from 'react';

import RechercherFormation from '~/client/components/features/Formation/Rechercher/RechercherFormation';

export default function FormationAlternancePage() {
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
