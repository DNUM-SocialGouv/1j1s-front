import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect } from 'react';

import RechercherAlternance from '~/client/components/features/Alternance/Rechercher/RechercherAlternance';
import ErrorUnavailableService from '~/client/components/layouts/Error/ErrorUnavailableService';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import analytics from '~/pages/apprentissage/index.analytics';

export default function RechercherAlternancePage() {
	const router = useRouter();
	const displayRechercherAlternanceLBA = process.env.NEXT_PUBLIC_ALTERNANCE_LBA_FEATURE === '1';

	useReferrer();
	useAnalytics(analytics);

	useEffect(() => {
		if (!displayRechercherAlternanceLBA && router.isReady) {
			const queryString = stringify(router.query);
			if (queryString.length === 0) router.replace({ query: 'page=1' }, undefined, { shallow: true });
		}
	}, [router, displayRechercherAlternanceLBA]);

	if (!displayRechercherAlternanceLBA) return <ErrorUnavailableService/>;

	return <RechercherAlternance/>;
}
