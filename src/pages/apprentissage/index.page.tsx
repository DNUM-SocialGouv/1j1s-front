import Joi from 'joi';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React from 'react';

import RechercherAlternance from '~/client/components/features/Alternance/Rechercher/RechercherAlternance';
import useAnalytics from '~/client/hooks/useAnalytics';
import empty from '~/client/utils/empty';
import { queryToArray } from '~/pages/api/utils/queryToArray.util';
import analytics from '~/pages/apprentissage/index.analytics';
import { AlternanceFiltre, ResultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import { Erreur } from '~/server/errors/erreur.types';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { dependencies } from '~/server/start';

interface RechercherAlternancePageProps {
	erreurRecherche?: Erreur
	resultats?: ResultatRechercheAlternance
}

export default function RechercherAlternancePage(props: RechercherAlternancePageProps) {
	useAnalytics(analytics);

	return <RechercherAlternance resultats={props.resultats} erreurRecherche={props.erreurRecherche} />;
}

export const alternancesQuerySchema = Joi.object({
	codeCommune: Joi.string().required(),
	codeRomes: Joi.string().required(),
	distanceCommune: Joi.string().required(),
	latitudeCommune: Joi.string().required(),
	longitudeCommune: Joi.string().required(),
}).options({ allowUnknown: true });

type RequestQuery = Partial<{[p: string]: string | string[]}>;

export function alternanceFiltreMapper(query: RequestQuery): AlternanceFiltre {
	return {
		codeCommune: query.codeCommune ? String(query.codeCommune) : '',
		codeRomes: query.codeRomes ? queryToArray(query.codeRomes) : [],
		distanceCommune: query.distanceCommune ? String(query.distanceCommune) : '',
		latitudeCommune: query.latitudeCommune ? String(query.latitudeCommune) : '',
		longitudeCommune: query.longitudeCommune ? String(query.longitudeCommune) : '',
	};
}

// NOTE (GAFI 08-08-2023): Rend le composant server-side
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<RechercherAlternancePageProps>> {
	const isFeatureActive = process.env.NEXT_PUBLIC_ALTERNANCE_LBA_FEATURE === '1';
	if (!isFeatureActive) {
		return { notFound: true };
	}

	const { query } = context;

	if (empty(query)) {
		return {
			props: {},
		};
	}

	if (alternancesQuerySchema.validate(query).error) {
		return {
			props: {
				erreurRecherche: ErreurMetier.DEMANDE_INCORRECTE,
			},
		};
	}
	const filtre = alternanceFiltreMapper(query);
	
	const resultats = await dependencies.alternanceDependencies.rechercherAlternance.handle(filtre);
	if (resultats.instance === 'failure') {
		return {
			props: {
				erreurRecherche: resultats.errorType,
			},
		};
	}
	return {
		props: {
			resultats: JSON.parse(JSON.stringify(resultats.result)),
		},
	};
}
