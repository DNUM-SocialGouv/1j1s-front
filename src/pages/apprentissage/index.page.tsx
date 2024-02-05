import Joi from 'joi';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import RechercherAlternance, {
	RechercherAlternanceProps,
} from '~/client/components/features/Alternance/Rechercher/RechercherAlternance';
import useAnalytics from '~/client/hooks/useAnalytics';
import empty from '~/client/utils/empty';
import { queryToArray } from '~/pages/api/utils/queryToArray.util';
import analytics from '~/pages/apprentissage/index.analytics';
import { AlternanceFiltre } from '~/server/alternances/domain/alternance';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { dependencies } from '~/server/start';

type RechercherAlternancePageProps = RechercherAlternanceProps;

export default function RechercherAlternancePage(props: RechercherAlternancePageProps) {
	useAnalytics(analytics);

	return <RechercherAlternance {...props} />;
}

export const alternancesQuerySchema = Joi.object({
	codeCommune: Joi.string().required(),
	codeRomes: Joi.string().required(),
	distanceCommune: Joi.string().required(),
	latitudeCommune: Joi.string().required(),
	longitudeCommune: Joi.string().required(),
}).options({ allowUnknown: true });

export function alternanceFiltreMapper(query: ParsedUrlQuery): AlternanceFiltre {
	return {
		codeCommune: query.codeCommune ? String(query.codeCommune) : '',
		codeRomes: query.codeRomes ? queryToArray(query.codeRomes) : [],
		distanceCommune: query.distanceCommune ? String(query.distanceCommune) : '',
		latitudeCommune: query.latitudeCommune ? String(query.latitudeCommune) : '',
		longitudeCommune: query.longitudeCommune ? String(query.longitudeCommune) : '',
	};
}

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
