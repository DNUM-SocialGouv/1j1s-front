import axios, { AxiosResponse } from 'axios';

import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { LoggerService } from '~/server/services/logger.service';

export function handleGetFailureError(e: unknown, context: string) {
	if (axios.isAxiosError(e)) {
		if(e.response?.status === 400 && (<AxiosResponse<{ message: string }>> e?.response)?.data?.message === '[API Rejoindre Mobilisation] 400 Bad request pour la ressource') {
			return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
		} else if(e.response?.status === 409 && (<AxiosResponse<{ message: string }>> e?.response)?.data?.message === '[API Rejoindre Mobilisation] 409 Conflict Identifiant') {
			return createFailure(ErreurMétier.CONFLIT_D_IDENTIFIANT);
		} else if(e.response?.status === 404 && (<AxiosResponse<{ message: string }>> e?.response)?.data?.message === '[API Rejoindre Mobilisation] 404 Contenu indisponible') {
			return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
		} else {
			LoggerService.errorWithExtra(
				new SentryException(
					'[API Rejoindre Mobilisation] Erreur inconnue - Insertion formulaire',
					{ context: `formulaire ${context}`, source: 'API Rejoindre Mobilisation' },
					{ errorDetail: e.response?.data },
				),
			);
			return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
		}
	}
	LoggerService.errorWithExtra(new SentryException(
		'[API Rejoindre Mobilisation] Erreur inconnue - Impossible de récupérer la ressource',
		{ context: `formulaire ${context}`, source: 'API Rejoindre Mobilisation' },
		{ stacktrace: (<Error> e).stack },
	));

	return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
}
