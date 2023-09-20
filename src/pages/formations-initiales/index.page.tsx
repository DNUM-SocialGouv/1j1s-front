import { GetServerSidePropsResult } from 'next';
import React from 'react';

import {
	RechercherFormationInitiale,
} from '~/client/components/features/FormationInitiale/Rechercher/RechercherFormationInitiale';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/formations-initiales/index.analytics';

export default function FormationsInitialesPage() {
	useAnalytics(analytics);

	return (
		<RechercherFormationInitiale/>
	);
};

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Record<never, never>>> {
	const isFormationsInitalesActive = process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE === '1';
	if (!isFormationsInitalesActive) {
		return {
			notFound: true,
		};
	}
	return {
		props: {},
	};
}
