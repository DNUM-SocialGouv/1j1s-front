import { GetServerSidePropsContext, GetServerSidePropsResult as NextGetServerSidePropsResult } from 'next';

import { Erreur } from '~/server/errors/erreur.types';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { ErreurTechnique } from '~/server/errors/erreurTechnique.types';

type ResultWithError<T> = T | {
	error: Erreur;
}

export type GetServerSidePropsResult<T> = NextGetServerSidePropsResult<ResultWithError<T>>

export function setStatusCode(context: GetServerSidePropsContext, erreur: Erreur): GetServerSidePropsResult<never> {
	switch (erreur) {
		case ErreurMetier.DEMANDE_INCORRECTE:
			context.res.statusCode = 400;
			break;
		case ErreurMetier.CONTENU_INDISPONIBLE:
			context.res.statusCode = 404;
			break;
		case ErreurMetier.CONFLIT_D_IDENTIFIANT:
			context.res.statusCode = 409;
			break;
		case ErreurTechnique.TOO_MANY_REQUESTS:
			context.res.statusCode = 429;
			break;
		case ErreurMetier.SERVICE_INDISPONIBLE:
			context.res.statusCode = 500;
			break;
	}
	return {
		props: {
			error: erreur,
		},
	};
}
