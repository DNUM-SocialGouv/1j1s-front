import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect } from 'react';

import { RechercherOffreEmploi } from '~/client/components/features/OffreEmploi/Rechercher/RechercherOffreEmploi';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import analytics from '~/pages/emplois/index.analytics';

export default function RechercherOffreEmploiPage() {
	const router = useRouter();
	useReferrer();
	useAnalytics(analytics);

	useEffect(() => {
		if (router.isReady) {
			const queryString = stringify(router.query);
			if (queryString.length === 0) router.replace({ query: 'page=1' }, undefined, { shallow: true });
		}

	}, [router]);

	if (Object.keys(router.query).length) return <RechercherOffreEmploi />;
	return null;
}
