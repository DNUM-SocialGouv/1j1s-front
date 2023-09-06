import { Erreur } from '~/server/errors/erreur.types';
import { ErreurMetier } from '~/server/errors/erreurMétier.types';


const SERVICE_INDISPONIBLE_TITLE = ' - Service indisponible';
const DEMANDE_INCORRECTE_TITLE = ' - Demande incorrecte';

export function formatRechercherSolutionDocumentTitle(prefixTitle: string, errorType?: Erreur): string {
	let title = '';
	switch (errorType) {
		case ErreurMetier.SERVICE_INDISPONIBLE: {
			title = SERVICE_INDISPONIBLE_TITLE;
			break;
		}
		case ErreurMetier.DEMANDE_INCORRECTE: {
			title = DEMANDE_INCORRECTE_TITLE;
			break;
		}
	}
	return `${prefixTitle}${title} | 1jeune1solution`;
}
