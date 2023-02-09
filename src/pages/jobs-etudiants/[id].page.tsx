import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { ConsulterOffreEmploi } from '~/client/components/features/OffreEmploi/Consulter/ConsulterOffreEmploi';
import { Head } from '~/client/components/head/Head';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { Offre, OffreId } from '~/server/offres/domain/offre';
import { dependencies } from '~/server/start';

interface ConsulterJobÉtudiantPageProps {
  jobÉtudiant: Offre;
}

export default function ConsulterJobÉtudiantPage({ jobÉtudiant }: ConsulterJobÉtudiantPageProps) {
	if (!jobÉtudiant) return null;

	return (
		<>
			<Head
				title={`${jobÉtudiant.intitulé} | 1jeune1solution`}
				robots="noindex"
			/>
			<ConsulterOffreEmploi offreEmploi={jobÉtudiant} />
		</>
	);
}

interface EmploiContext extends ParsedUrlQuery {
  id: OffreId;
}

export async function getServerSideProps(context: GetServerSidePropsContext<EmploiContext>): Promise<GetServerSidePropsResult<ConsulterJobÉtudiantPageProps>> {
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
			jobÉtudiant: JSON.parse(JSON.stringify(offreEmploi.result)),
		},
	};
}
