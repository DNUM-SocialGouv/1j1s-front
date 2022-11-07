import axios, { AxiosError } from 'axios';

import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { LoggerService } from '~/server/services/logger.service';

export interface ApiPoleEmploiErrorResponse {
  message: string
}

export const errorFromApiPoleEmploi = [
  'Format du paramètre « motsCles » incorrect. 7 mots-clé au maximum séparés par des virgules et d\'au moins 2 caractères.',
  'La plage de résultats demandée est trop importante.',
  'Format du paramètre « range » incorrect. <entier>-<entier> attendu.',
  'Valeur du paramètre « natureContrat » incorrecte.',
  'Valeur du paramètre « typeContrat » incorrecte.',
  'Valeur du paramètre « departement » incorrecte.',
  'Valeur du paramètre « commune » incorrecte.',
  'Valeur du paramètre « region » incorrecte.',
  'Format du paramètre « tempsPlein » incorrect. Booléen attendu.',
  'Format du paramètre « grandDomaine » incorrect. A, B, C, C15, D, E, F, G, H, I, J, K, L, L14, M15, M18, M, M16, M17, M13, M14 ou N attendu.',
  'Format du paramètre « experienceExigence » incorrect. D, E ou S attendu.',
];

export function handleSearchFailureError(e: unknown) {
  if (axios.isAxiosError(e)) {
    const error: AxiosError<ApiPoleEmploiErrorResponse> = e as AxiosError<ApiPoleEmploiErrorResponse>;
    if(error.response?.status === 400 && errorFromApiPoleEmploi.includes(e.response?.data.message)) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    } else {
      LoggerService.warn('[API Pole Emploi] recherche incorrecte');
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
  }
  LoggerService.error('[API Pole Emploi] impossible de rechercher');
  return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
}
