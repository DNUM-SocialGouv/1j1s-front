import { GetServerSidePropsResult } from 'next';

import RechercherStages3eEt2de
	from '~/client/components/features/Stages3eEt2de/Rechercher/RechercherStages3eEt2de';
import useAnalytics from '~/client/hooks/useAnalytics';

import analytics from './index.analytics';

export default function Stages3eEt2dePage() {
	useAnalytics(analytics);

	return <RechercherStages3eEt2de/>;
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
