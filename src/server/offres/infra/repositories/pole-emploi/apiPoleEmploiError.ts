import axios, { AxiosError, AxiosResponse } from 'axios';

import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
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

export function handleSearchFailureError(e: unknown, context: string) {
	if (axios.isAxiosError(e)) {
		const error: AxiosError<ApiPoleEmploiErrorResponse> = e as AxiosError<ApiPoleEmploiErrorResponse>;
		if(error.response?.status === 400 && errorFromApiPoleEmploi.includes((<AxiosResponse<{ message: string }>> e?.response)?.data?.message)) {
			return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
		} else {
			LoggerService.warnWithExtra(
				new SentryException(
					'[API Pole Emploi] impossible d’éffectuer une recherche',
					{ context: `recherche ${context}`, source: 'API Pole Emploi' },
					{ errorDetail: error.response?.data },
				),
			);
			return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
		}
	}
	LoggerService.errorWithExtra(new SentryException(
		'[API Pole Emploi] impossible d’éffectuer une recherche',
		{ context: 'recherche offre emploi', source: 'API Pole Emploi' },
		{ stacktrace: (<Error> e).stack },
	));
	return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
}

export function handleGetFailureError(e: unknown, context: string) {
	if (axios.isAxiosError(e)) {
		const error: AxiosError<ApiPoleEmploiErrorResponse> = e as AxiosError<ApiPoleEmploiErrorResponse>;
		if(error.response?.status === 400 && (<AxiosResponse<{ message: string }>> e?.response)?.data?.message === 'Le format de l\'id de l\'offre recherchée est incorrect.') {
			return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
		} else {
			LoggerService.warnWithExtra(
				new SentryException(
					'[API Pole Emploi] impossible de récupérer une ressource',
					{ context: `détail ${context}`, source: 'API Pole Emploi' },
					{ errorDetail: error.response?.data },
				),
			);
			return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
		}
	}
	LoggerService.errorWithExtra(new SentryException(
		'[API Pole Emploi] impossible de récupérer une ressource',
		{ context: 'détail offre emploi', source: 'API Pole Emploi' },
		{ stacktrace: (<Error> e).stack },
	));

	return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
}
