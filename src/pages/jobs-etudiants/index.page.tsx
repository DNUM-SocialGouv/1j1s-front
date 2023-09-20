import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect } from 'react';

import { RechercherJobÉtudiant } from '~/client/components/features/JobÉtudiant/Rechercher/RechercherJobÉtudiant';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/jobs-etudiants/index.analytics';

export default function RechercherJobÉtudiantPage() {
	const router = useRouter();

	useAnalytics(analytics);

	useEffect(() => {
		if (router.isReady) {
			const queryString = stringify(router.query);
			if (queryString.length === 0) router.replace({ query: 'page=1' }, undefined, { shallow: true });
		}
	}, [router]);

	if (Object.keys(router.query).length) return <RechercherJobÉtudiant />;
	return null;

}
