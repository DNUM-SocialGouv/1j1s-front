import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect } from 'react';

import { RechercherOffreEmploi } from '~/client/components/features/OffreEmploi/Rechercher/RechercherOffreEmploi';
import useAnalytics from '~/client/hooks/useAnalytics';
import empty from '~/client/utils/empty';
import { emploiFiltreMapper } from '~/pages/api/emplois/index.controller';
import analytics from '~/pages/emplois/index.analytics';
import { RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { dependencies } from '~/server/start';

interface RechercherOffreEmploiPageProps {
	resultats?: RésultatsRechercheOffre
}

export default function RechercherOffreEmploiPage(props: RechercherOffreEmploiPageProps) {
	const router = useRouter();
	useAnalytics(analytics);

	useEffect(() => {
		if (router.isReady) {
			const queryString = stringify(router.query);
			if (queryString.length === 0) router.replace({ query: 'page=1' }, undefined, { scroll: false });
		}
	}, [router]);

	return <RechercherOffreEmploi resultats={props.resultats} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<RechercherOffreEmploiPageProps>> {
	const { query } = context;

	if (empty(query)) {
		return {
			props: {},
		};
	}
	const filtres = emploiFiltreMapper(context.query);

	const resultatsRecherche = await dependencies.offreEmploiDependencies.rechercherOffreEmploi.handle(filtres);
	if (resultatsRecherche.instance === 'failure') {
		return {
			props: {},
		};
	}
	return {
		props: {
			resultats: JSON.parse(JSON.stringify(resultatsRecherche.result)),
		},
	};
}
