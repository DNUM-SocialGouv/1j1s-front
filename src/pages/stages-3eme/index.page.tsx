import { GetServerSidePropsResult } from 'next';

import RechercherStages3eme from '~/client/components/features/Stages3eme/Rechercher/RechercherStages3eme';
import useAnalytics from '~/client/hooks/useAnalytics';

import analytics from './index.analytics';

export default function Stages3emePage() {
	useAnalytics(analytics);

	return <RechercherStages3eme/>;
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Record<never, never>>> {
	const isFeatureActive = process.env.NEXT_PUBLIC_STAGES_3EME_FEATURE === '1';

	if (!isFeatureActive) {
		return { notFound: true };
	}

	return {
		props: {},
	};
}
