import Joi from 'joi';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import RechercherFormationAlternance
	from '~/client/components/features/FormationAlternance/Rechercher/RechercherFormationAlternance';
import useAnalytics from '~/client/hooks/useAnalytics';
import empty from '~/client/utils/empty';
import { transformQueryToArray } from '~/pages/api/utils/joi/joi.util';
import { queryToArray } from '~/pages/api/utils/queryToArray.util';
import analytics from '~/pages/formations/apprentissage/index.analytics';
import { isFailure } from '~/server/errors/either';
import { Erreur } from '~/server/errors/erreur.types';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { changeStatusCodeWhenErrorOcurred } from '~/server/errors/handleGetServerSidePropsError';
import {
	Formation,
	FormationFiltre,
	NiveauRequisValeur,
	RésultatRechercheFormation,
} from '~/server/formations/domain/formation';
import { dependencies } from '~/server/start';

interface RechercherFormationApprentissagePageProps {
	resultats?: Array<RésultatRechercheFormation>
	erreurRecherche?: Erreur
}


export default function FormationAlternancePage(props: RechercherFormationApprentissagePageProps) {
	useAnalytics(analytics);

	return (
		<RechercherFormationAlternance {...props}/>
	);
};


const formationQuerySchema = Joi.object({
	codeCommune: Joi.string().required(),
	codeRomes: transformQueryToArray.array().items(Joi.string()).required(),
	distanceCommune: Joi.string().required(),
	latitudeCommune: Joi.string().required(),
	longitudeCommune: Joi.string().required(),
	niveauEtudes: Joi.valid(...Object.values(NiveauRequisValeur)),
}).options({ allowUnknown: true });


function filtreQuery(query: ParsedUrlQuery): FormationFiltre {
	return {
		codeCommune: query.codeCommune ? String(query.codeCommune) : '',
		codeRomes: query.codeRomes ? queryToArray(query.codeRomes) : [],
		distanceCommune: query.distanceCommune ? String(query.distanceCommune) : '',
		latitudeCommune: query.latitudeCommune ? String(query.latitudeCommune) : '',
		longitudeCommune: query.longitudeCommune ? String(query.longitudeCommune) : '',
		niveauEtudes: query.niveauEtudes && query.niveauEtudes !== Formation.NIVEAU_INDIFFERENT.valeur ? String(query.niveauEtudes) : '',
	};
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<RechercherFormationApprentissagePageProps>> {
	const isFormationActive = process.env.NEXT_PUBLIC_FORMATION_LBA_FEATURE === '1';
	if (!isFormationActive) {
		return { notFound: true };
	}

	const { query } = context;

	if (empty(query)) {
		return {
			props: {},
		};
	}

	if (formationQuerySchema.validate(query).error) {
		return {
			props: {
				erreurRecherche: ErreurMetier.DEMANDE_INCORRECTE,
			},
		};
	}

	const filtres = filtreQuery(query);
	const resultatsRecherche = await dependencies.formationDependencies.rechercherFormation.handle(filtres);

	if (isFailure(resultatsRecherche)) {
		changeStatusCodeWhenErrorOcurred(context, resultatsRecherche.errorType);
		return {
			props: {
				erreurRecherche: resultatsRecherche.errorType,
			},
		};
	}

	return {
		props: {
			resultats: JSON.parse(JSON.stringify(resultatsRecherche.result)),
		},
	};
}
