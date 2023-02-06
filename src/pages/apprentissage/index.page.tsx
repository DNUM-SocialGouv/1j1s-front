import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect } from 'react';

import { RechercherAlternance } from '~/client/components/features/Alternance/Rechercher/RechercherAlternance';
import useReferrer from '~/client/hooks/useReferrer';
import { RechercherAlternanceLBA } from '~/client/components/features/Alternance/Rechercher/RechercherAlternanceLBA';

export default function RechercherAlternancePage() {
	const router = useRouter();

	useReferrer();

	useEffect(() => {
		if (router.isReady) {
			const queryString = stringify(router.query);
			if (queryString.length === 0) router.replace({ query: 'page=1' }, undefined, { shallow: true });
		}
	}, [router]);

	if (Object.keys(router.query).length) {
		if (process.env.NEXT_PUBLIC_ALTERNANCE_LBA_FEATURE === '1') return <RechercherAlternanceLBA/>;
		else return <RechercherAlternance/>;
	}
	return null;
}
