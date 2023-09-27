import { GetServerSidePropsResult } from 'next';

import RechercherEmploisEurope from '~/client/components/features/EmploisEurope/Rechercher/RechercherEmploisEurope';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/emplois-europe/index.analytics';

export default function EmploiEuropePage() {
	useAnalytics(analytics);

	return <>
		<RechercherEmploisEurope />
	</>;
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Record<never, never>>> {
	const isFeatureActive = process.env.NEXT_PUBLIC_EMPLOIS_EUROPE_FEATURE === '1';

	if (!isFeatureActive) {
		return { notFound: true };
	}

	return {
		props: {},
	};
}
