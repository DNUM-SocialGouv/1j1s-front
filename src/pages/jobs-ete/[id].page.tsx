import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { ConsulterOffreEmploi } from '~/client/components/features/OffreEmploi/Consulter/ConsulterOffreEmploi';
import { Head } from '~/client/components/head/Head';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/jobs-etudiants/[id].analytics';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { Offre, OffreId } from '~/server/offres/domain/offre';
import { dependencies } from '~/server/start';

interface ConsulterJobEtePageProps {
	jobEte: Offre;
}

export default function ConsulterJobEtePage({ jobEte }: ConsulterJobEtePageProps) {
	useAnalytics(analytics);

	if (!jobEte) return null;

	return (
		<>
			<Head
				title={`${jobEte.intitulé} | 1jeune1solution`}
				robots="noindex"
			/>
			<ConsulterOffreEmploi offreEmploi={jobEte} />
		</>
	);
}

interface EmploiContext extends ParsedUrlQuery {
	id: OffreId;
}

export async function getServerSideProps(context: GetServerSidePropsContext<EmploiContext>): Promise<GetServerSidePropsResult<ConsulterJobEtePageProps>> {
	if (!context.params) {
		throw new PageContextParamsException();
	}
	const { id } = context.params;
	const offreEmploi = await dependencies.offreEmploiDependencies.consulterOffreEmploi.handle(id);

	if (offreEmploi.instance === 'failure') {
		return { notFound: true };
	}

	return {
		props: {
			jobEte: JSON.parse(JSON.stringify(offreEmploi.result)),
		},
	};
}
