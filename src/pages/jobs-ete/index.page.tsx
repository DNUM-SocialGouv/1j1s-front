import { GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect } from 'react';

import { RechercherJobEte } from '~/client/components/features/JobEte/Rechercher/RechercherJobEte';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import analytics from '~/pages/jobs-ete/index.analytics';

export default function RechercherJobsEtePage() {
	const router = useRouter();
	useAnalytics(analytics);
	useReferrer();

	useEffect(() => {
		if (router.isReady) {
			const queryString = stringify(router.query);
			if (queryString.length === 0) router.replace({ query: 'page=1' }, undefined, { shallow: true });
		}
	}, [router]);

	if (!Object.keys(router.query).length) {
		return null;
	}
	return <RechercherJobEte />;
};

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Record<never, never>>> {
	const isJobsEteActive = process.env.NEXT_PUBLIC_JOB_ETE_FEATURE === '1';
	if (!isJobsEteActive) {
		return {
			notFound: true,
		};
	}
	return {
		props: {},
	};
}
