import axios, { AxiosResponse } from 'axios';

import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { LoggerService } from '~/server/services/logger.service';


export function handleGetFailureError(e: unknown, context: string) {
  if (axios.isAxiosError(e)) {
    if(e.response?.status === 400 && (<AxiosResponse<{ message: string }>> e?.response)?.data?.message === '[API Strapi] 400 Bad request pour la ressource') {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    } else if(e.response?.status === 401 && (<AxiosResponse<{ message: string }>> e?.response)?.data?.message === '[API Strapi] 401 Unauthorized') {
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    } else if(e.response?.status === 403 && (<AxiosResponse<{ message: string }>> e?.response)?.data?.message === '[API Strapi] 403 Forbidden pour la ressource') {
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    } else if(e.response?.status === 404 && (<AxiosResponse<{ message: string }>> e?.response)?.data?.message === '[API Strapi] 404 Contenu indisponible') {
      return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
    } else if(e.response?.status === 500 && (<AxiosResponse<{ message: string }>> e?.response)?.data?.message === '[API Strapi] 500 Internal server error') {
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
    else {
      LoggerService.warnWithExtra(
        new SentryException(
          '[API Strapi] Erreur inconnue - Impossible de récupérer la ressource',
          { context: `détail ${context}`, source: 'API Strapi' },
          { errorDetail: e.response?.data },
        ),
      );
      return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
    }
  }
  LoggerService.errorWithExtra(new SentryException(
    '[API Strapi] Erreur inconnue - Impossible de récupérer la ressource',
    { context: 'détail strapi', source: 'API Strapi' },
    { stacktrace: (<Error> e).stack },
  ));

  return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
}
