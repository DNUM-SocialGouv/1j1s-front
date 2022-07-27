import { ErrorType } from '~/server/errors/error.types';


const SERVICE_INDISPONIBLE_TITLE = '- Service indisponible';
const DEMANDE_INCORRECTE_TITLE = '- Demande incorrecte';

export function getRechercherOffreHeadTagTitre(prefixTitle: string, errorType?: ErrorType): string {
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
  }
  return `${prefixTitle} ${title} | 1jeune1solution`;
}
