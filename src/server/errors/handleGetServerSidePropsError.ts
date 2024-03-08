import { GetServerSidePropsContext } from 'next';

import { Erreur } from '~/server/errors/erreur.types';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { ErreurTechnique } from '~/server/errors/erreurTechnique.types';
import { GetServerSidePropsResult } from '~/server/errors/getServerSidePropsResultWithError';

export function handleGetServerSidePropsError(context: GetServerSidePropsContext, erreur: Erreur): GetServerSidePropsResult<never> {
	switch (erreur) {
		case ErreurMetier.DEMANDE_INCORRECTE:
			context.res.statusCode = 400;
			break;
		case ErreurMetier.CONTENU_INDISPONIBLE:
			return { notFound: true };
		case ErreurMetier.CONFLIT_D_IDENTIFIANT:
			context.res.statusCode = 409;
			break;
		case ErreurTechnique.TOO_MANY_REQUESTS:
			context.res.statusCode = 429;
			break;
		default:
			context.res.statusCode = 500;
			break;
	}
	return {
		props: {
			error: erreur,
		},
	};
}
