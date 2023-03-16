import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React from 'react';

import { Detail } from '~/client/components/features/Alternance/Detail/Detail';
import { Head } from '~/client/components/head/Head';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/apprentissage/[id].analytics';
import { Alternance } from '~/server/alternances/domain/alternance';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';
import { dependencies } from '~/server/start';

export type AlternanceSerialized = Omit<Alternance, 'dateDébut'> & { dateDébut?: string };
type ConsulterAnnonceAlternancePageProps = {
  alternanceSerialized: AlternanceSerialized;
}

export async function getServerSideProps(context: GetServerSidePropsContext<{ id: string }>): Promise<GetServerSidePropsResult<ConsulterAnnonceAlternancePageProps>> {
	const featureActivée = process.env.NEXT_PUBLIC_ALTERNANCE_LBA_FEATURE === '1';
	if (!featureActivée) {
		return { notFound: true };
	}

	if (!context.params) {
		throw new PageContextParamsException();
	}

	const { id } = context.params;
	const annonce = await dependencies.alternanceDependencies.consulterAlternance.handle(id);

	if (annonce.instance === 'failure') {
		return { notFound: true };
	}
	const alternance: AlternanceSerialized = {
		compétences: annonce.result.compétences,
		dateDébut: annonce.result.dateDébut?.toISOString(),
		description: annonce.result.description,
		durée: annonce.result.durée,
		entreprise: {
			adresse: annonce.result.entreprise.adresse,
			nom: annonce.result.entreprise.nom,
			téléphone: annonce.result.entreprise.téléphone,
		},
		id: annonce.result.id,
		localisation: annonce.result.localisation,
		natureDuContrat: annonce.result.natureDuContrat,
		niveauRequis: annonce.result.niveauRequis,
		rythmeAlternance: annonce.result.rythmeAlternance,
		source: annonce.result.source,
		tags: annonce.result.tags,
		titre: annonce.result.titre,
		typeDeContrat: annonce.result.typeDeContrat,
		url: annonce.result.url,
	};
	return {
		props: {
			alternanceSerialized: removeUndefinedKeys(alternance),
		},
	};
}

export default function AnnonceAlternancePage({ alternanceSerialized }: ConsulterAnnonceAlternancePageProps) {
	useAnalytics(analytics);

	const alternance: Alternance = {
		...alternanceSerialized,
		dateDébut: alternanceSerialized.dateDébut ? new Date(alternanceSerialized.dateDébut) : undefined,
	};

	return (
		<>
			<Head
				title={`${alternanceSerialized.titre} | 1jeune1solution`}
				robots="noindex"
			/>
			<Detail annonce={alternance} />
		</>
	);
}
