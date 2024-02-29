import { Head } from '~/client/components/head/Head';
import ErrorIdentifierConflict from '~/client/components/layouts/Error/ErrorIdentifierConflict';
import ErrorIncorrectRequest from '~/client/components/layouts/Error/ErrorIncorrectRequest';
import ErrorNotFound from '~/client/components/layouts/Error/ErrorNotFound';
import ErrorTooManyRequests from '~/client/components/layouts/Error/ErrorTooManyRequests';
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
			return <>
				<Head
					robots="noindex"
					title="Contenu indisponible | 1jeune1solution"
				/>
				<ErrorNotFound />
			</>;
		case ErreurMetier.DEMANDE_INCORRECTE:
			return <>
				<Head
					robots="noindex"
					title="Demande incorrecte | 1jeune1solution"
				/>
				<ErrorIncorrectRequest />
			</>;
		case ErreurMetier.CONFLIT_D_IDENTIFIANT:
			return <>
				<Head
					robots="noindex"
					title="Conflit d'identifiant | 1jeune1solution"
				/>
				<ErrorIdentifierConflict />
			</>;
		case ErreurTechnique.TOO_MANY_REQUESTS:
			return <>
				<Head
					robots="noindex"
					title="Trop de requêtes | 1jeune1solution"
				/>
				<ErrorTooManyRequests />
			</>;
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
