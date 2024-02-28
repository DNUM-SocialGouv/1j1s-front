import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { ConsulterOffreEmploi } from '~/client/components/features/OffreEmploi/Consulter/ConsulterOffreEmploi';
import { Head } from '~/client/components/head/Head';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/emplois/[id].analytics';
import { GetServerSidePropsResult, setStatusCode } from '~/server/exceptions/getServerSidePropsResultWithError';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { Offre, OffreId } from '~/server/offres/domain/offre';
import { dependencies } from '~/server/start';

interface ConsulterOffreEmploiPageProps {
  offreEmploi: Offre;
}

export default function ConsulterOffreEmploiPage({ offreEmploi }: ConsulterOffreEmploiPageProps) {
	useAnalytics(analytics);

	if (!offreEmploi) return null;

	return (
		<>
			<Head
				title={`${offreEmploi.intitulé} | 1jeune1solution`}
				robots="noindex"
			/>
			<ConsulterOffreEmploi offreEmploi={offreEmploi} />
		</>
	);
}

interface EmploiContext extends ParsedUrlQuery {
  id: OffreId;
}

export async function getServerSideProps(context: GetServerSidePropsContext<EmploiContext>): Promise<GetServerSidePropsResult<ConsulterOffreEmploiPageProps>> {
	if (!context.params) {
		throw new PageContextParamsException();
	}
	const { id } = context.params;
	const offreEmploi = await dependencies.offreEmploiDependencies.consulterOffreEmploi.handle(id.toUpperCase());

	if (offreEmploi.instance === 'failure') {
		return setStatusCode(context, offreEmploi.errorType);
	}

	return {
		props: {
			offreEmploi: JSON.parse(JSON.stringify(offreEmploi.result)),
		},
	};
}
