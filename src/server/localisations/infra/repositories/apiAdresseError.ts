import axios, { AxiosError, AxiosResponse } from 'axios';

import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { LoggerService } from '~/server/services/logger.service';


interface ApiAdresseErrorResponse {
  message: string
}

export function handleGetFailureError(e: unknown, context: string) {
  if (axios.isAxiosError(e)) {
    const error: AxiosError<ApiAdresseErrorResponse> = e as AxiosError<ApiAdresseErrorResponse>;
    if(error.response?.status === 400 && (<AxiosResponse<{ message: string }>> e?.response)?.data?.message === 'Le format de l’id de l’adresse recherchée est incorrect.') {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    } else {
      LoggerService.warnWithExtra(
        new SentryException(
          '[API Adresse] impossible de récupérer une ressource',
          { context: `détail ${context}`, source: 'API Adresse' },
          { errorDetail: error.response?.data },
        ),
      );
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
  }
  LoggerService.errorWithExtra(new SentryException(
    '[API Adresse] impossible de récupérer une ressource',
    { context: 'détail adresse', source: 'API Adresse' },
    { stacktrace: (<Error> e).stack },
  ));

  return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
}
