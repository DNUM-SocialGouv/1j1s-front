import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React from 'react';

import { Detail } from '~/client/components/features/Alternance/Detail/Detail';
import { DetailAlternance } from '~/client/components/features/Alternance/Detail/DetailAlternance.type';
import { Head } from '~/client/components/head/Head';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { dependencies } from '~/server/start';

type DetailAlternanceSerialized = Omit<DetailAlternance, 'dateDébut'> & { dateDébut?: string };
type ConsulterAnnonceAlternancePageProps = {
  annonce: DetailAlternanceSerialized;
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

	const detailAlternance: DetailAlternanceSerialized = {
		compétences: annonce.result.compétences,
		dateDébut: annonce.result.dateDébut?.toISOString(),
		durée: annonce.result.durée,
		entreprise: {
			localisation: annonce.result.entreprise.adresse,
			nom: annonce.result.entreprise.nom,
			téléphone: annonce.result.entreprise.téléphone,
		},
		localisation: annonce.result.localisation,
		niveauRequis: annonce.result.niveauRequis,
		rythmeAlternance: annonce.result.rythmeAlternance,
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
	const parsedDétail: DetailAlternance = {
		...annonce,
		dateDébut: annonce.dateDébut ? new Date(annonce.dateDébut) : undefined,
	};

	return (
		<>
			<Head
				title={`${annonce.titre} | 1jeune1solution`}
				robots="noindex"
			/>
			<Detail annonce={parsedDétail} />
		</>
	);
}
