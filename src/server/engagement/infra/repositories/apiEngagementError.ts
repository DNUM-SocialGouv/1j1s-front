import axios, { AxiosResponse } from 'axios';

import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { LoggerService } from '~/server/services/logger.service';

export function handleSearchFailureError(e: unknown) {
  if(axios.isAxiosError(e)) {
    LoggerService.errorWithExtra(new SentryException(
      '[API Engagement] impossible d’effectuer une recherche',
      { context: 'recherche engagement', source: 'API Engagement' },
      { errorDetail: e.response?.data },
    ));
  } else {
    LoggerService.errorWithExtra(new SentryException(
      '[API Engagement] impossible d’effectuer une recherche',
      { context: 'recherche engagement', source: 'API Engagement' },
      { stacktrace: (<Error> e).stack },
    ));
  }

  return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
}

export function handleGetFailureError(e: unknown, context: string) {
  if (axios.isAxiosError(e)) {
    if(e.response?.status === 403 && (<AxiosResponse<{ error: string }>> e?.response)?.data?.error === 'Id not valid') {
      return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
    } else {
      LoggerService.warnWithExtra(
        new SentryException(
          '[API Pole Emploi] impossible de récupérer une ressource',
          { context: `détail ${context}`, source: 'API Engagement' },
          { errorDetail: e.response?.data },
        ),
      );
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
  }
  LoggerService.errorWithExtra(new SentryException(
    '[API Engagement] impossible de récupérer une ressource',
    { context: 'détail engagement', source: 'API Engagement' },
    { stacktrace: (<Error> e).stack },
  ));
  return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
}
