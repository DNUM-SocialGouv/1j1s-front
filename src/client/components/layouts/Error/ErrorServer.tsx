import { Head } from '~/client/components/head/Head';
import Error400Page from '~/client/components/layouts/ErrorPage/Error400Page';
import Error404Page from '~/client/components/layouts/ErrorPage/Error404Page';
import Error409Page from '~/client/components/layouts/ErrorPage/Error409Page';
import Error429Page from '~/client/components/layouts/ErrorPage/Error429Page';
import { Erreur } from '~/server/errors/erreur.types';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { ErreurTechnique } from '~/server/errors/erreurTechnique.types';

import ErrorUnavailableService from './ErrorUnavailableService';

interface ErrorServerProps {
	error: Erreur;
}

export default function ErrorServer({ error }: ErrorServerProps) {
	switch (error) {
		case ErreurMetier.CONTENU_INDISPONIBLE:
			return <Error404Page />;
		case ErreurMetier.DEMANDE_INCORRECTE:
			return <Error400Page />;
		case ErreurMetier.CONFLIT_D_IDENTIFIANT:
			return <Error409Page />;
		case ErreurTechnique.TOO_MANY_REQUESTS:
			return <Error429Page />;
		default:
			return <>
				<Head
					robots="noindex"
					title="Service indisponible | 1jeune1solution"
				/>
				<ErrorUnavailableService />
			</>;
	}
}
