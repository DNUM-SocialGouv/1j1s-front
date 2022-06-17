import { ErrorType } from '~/server/errors/error.types';


const SERVICE_INDISPONIBLE_TITLE = '- Service indisponible';
const DEMANDE_INCORRECTE_TITLE = '- Demande incorrecte';
const ERREUR_INATTENDUE_TITLE = '- Erreur inattendue';

export function getOffreHeadTagTitre(prefixTitle: string, errorType?: ErrorType): string {
  let title = '';
  switch (errorType) {
    case ErrorType.SERVICE_INDISPONIBLE: {
      title = SERVICE_INDISPONIBLE_TITLE;
      break;
    }
    case ErrorType.DEMANDE_INCORRECTE: {
      title = DEMANDE_INCORRECTE_TITLE;
      break;
    }
    case ErrorType.ERREUR_INATTENDUE: {
      title = ERREUR_INATTENDUE_TITLE;
      break;
    }
  }
  return `${prefixTitle} ${title} | 1jeune1solution`;
}
