import Joi from 'joi';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect } from 'react';

import { RechercherJobÉtudiant } from '~/client/components/features/JobÉtudiant/Rechercher/RechercherJobÉtudiant';
import useAnalytics from '~/client/hooks/useAnalytics';
import empty from '~/client/utils/empty';
import { transformQueryToArray } from '~/pages/api/utils/joi/joi.util';
import { queryToArray } from '~/pages/api/utils/queryToArray.util';
import analytics from '~/pages/jobs-etudiants/index.analytics';
import { Erreur } from '~/server/errors/erreur.types';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { JobÉtudiantFiltre } from '~/server/jobs-étudiants/domain/jobÉtudiant';
import { DomaineCode, MAX_PAGE_ALLOWED_BY_POLE_EMPLOI, RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { mapLocalisation } from '~/server/offres/infra/controller/offreFiltre.mapper';
import { dependencies } from '~/server/start';

interface RechercherJobEtudiantPageProps {
	erreurRecherche?: Erreur
	resultats?: RésultatsRechercheOffre
}

export default function RechercherJobÉtudiantPage(props: RechercherJobEtudiantPageProps) {
	const router = useRouter();

	useAnalytics(analytics);

	useEffect(() => {
		if (router.isReady) {
			const queryString = stringify(router.query);
			if (queryString.length === 0) router.replace({ query: 'page=1' }, undefined, { scroll: false });
		}
	}, [router]);

	return <RechercherJobÉtudiant resultats={props.resultats} erreurRecherche={props.erreurRecherche} />;
}

const jobsEtudiantsQuerySchema = Joi.object({
	codeLocalisation: Joi.string().alphanum().max(5),
	grandDomaine: transformQueryToArray.array().items(Joi.string().valid(...Object.values(DomaineCode as unknown as Record<string, string>))),
	motCle: Joi.string(),
	page: Joi.number().min(1).max(MAX_PAGE_ALLOWED_BY_POLE_EMPLOI).required(),
	typeLocalisation: Joi.string().valid('REGION', 'DEPARTEMENT', 'COMMUNE'),
}).options({ allowUnknown: true });

type RequestQuery = Partial<{[p: string]: string | string[]}>;

function jobÉtudiantFiltreMapper(query: RequestQuery): JobÉtudiantFiltre {
	return {
		grandDomaineList: query.grandDomaine ? queryToArray(query.grandDomaine) : undefined,
		localisation: mapLocalisation(query),
		motClé: query.motCle ? String(query.motCle) : '',
		page: Number(query.page),
	};
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<RechercherJobEtudiantPageProps>> {
	const { query } = context;

	if (empty(query)) {
		return {
			props: {},
		};
	}

	if (jobsEtudiantsQuerySchema.validate(query).error) {
		return {
			props: {
				erreurRecherche: ErreurMetier.DEMANDE_INCORRECTE,
			},
		};
	}
	const filtres = jobÉtudiantFiltreMapper(context.query);

	const resultatsRecherche = await dependencies.offreJobÉtudiantDependencies.rechercherOffreJobÉtudiant.handle(filtres);
	if (resultatsRecherche.instance === 'failure') {
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
