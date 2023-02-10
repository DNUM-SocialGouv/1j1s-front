import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect } from 'react';

import { RechercherAlternance } from '~/client/components/features/Alternance/Rechercher/RechercherAlternance';
import { RechercherAlternancePoleEmploi } from '~/client/components/features/Alternance/Rechercher/RechercherAlternancePoleEmploi';
import useReferrer from '~/client/hooks/useReferrer';

export default function RechercherAlternancePage() {
	const router = useRouter();
	const displayRechercherAlternanceLBA = process.env.NEXT_PUBLIC_ALTERNANCE_LBA_FEATURE === '1';

	useReferrer();

	useEffect(() => {
		if (!displayRechercherAlternanceLBA && router.isReady) {
			const queryString = stringify(router.query);
			if (queryString.length === 0) router.replace({ query: 'page=1' }, undefined, { shallow: true });
		}
	}, [router, displayRechercherAlternanceLBA]);

	if (displayRechercherAlternanceLBA) return  <RechercherAlternance/>;

	if (Object.keys(router.query).length) {
		return <RechercherAlternancePoleEmploi/>;
	}
	return null;
}
