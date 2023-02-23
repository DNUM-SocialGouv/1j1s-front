import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React from 'react';

import { Detail } from '~/client/components/features/Alternance/Detail/Detail';
import { DetailAlternance } from '~/client/components/features/Alternance/Detail/DetailAlternance.type';
import { Head } from '~/client/components/head/Head';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { dependencies } from '~/server/start';

type ConsulterAnnonceAlternancePageProps = {
  annonce: DetailAlternance;
}

function convertUndefinedToNull<T>(payload: T): T {
	return JSON.parse(JSON.stringify(payload));
}

export async function getServerSideProps(context: GetServerSidePropsContext<{ id: string }>): Promise<GetServerSidePropsResult<ConsulterAnnonceAlternancePageProps>> {
	if (!context.params) {
		throw new PageContextParamsException();
	}
	const { id } = context.params;
	const annonce = await dependencies.alternanceDependencies.consulterAlternance.handle(id);

	if (annonce.instance === 'failure') {
		return { notFound: true };
	}

	const detailAlternance: DetailAlternance = {
		compétences: annonce.result.compétences,
		localisation: annonce.result.localisation,
		niveauRequis: annonce.result.niveauRequis,
		nomEntreprise: annonce.result.nomEntreprise,
		titre: annonce.result.titre,
		typeDeContrat: annonce.result.typeDeContrat,
	};
	return {
		props: {
			annonce: convertUndefinedToNull(detailAlternance),
		},
	};
}

export default function AnnonceAlternancePage({ annonce }: ConsulterAnnonceAlternancePageProps) {
	return (
		<>
			<Head
				title={`${annonce.titre} | 1jeune1solution`}
				robots="noindex"
			/>
			<Detail annonce={annonce} />
		</>
	);
}
