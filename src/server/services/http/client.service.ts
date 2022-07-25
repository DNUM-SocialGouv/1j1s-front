import * as Sentry from '@sentry/nextjs';
import * as CaptureContext from '@sentry/types';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';

import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';

export abstract class ClientService {
  readonly client: AxiosInstance;

  abstract get<Response, Retour>(
    endpoint: string,
    mapper: (data: Response) => Retour,
    config?: AxiosRequestConfig,
  ): Promise<Either<Retour>>;

  protected constructor(
    apiName: string,
    baseURL: string,
    overrideInterceptorsResponse = false,
    headers: AxiosRequestHeaders = {},
  ) {
    this.client = axios.create({
      baseURL,
      headers,
    });

    if(!overrideInterceptorsResponse) {
      this.client.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error) => {
          Sentry.captureMessage(`${apiName} ${error.response.status + ' ' + error.config.baseURL+error.config.url}`, CaptureContext.Severity.Error);
          return Promise.reject(error);
        },
      );
    }
  }

  protected setAuthorizationHeader(token: string): void {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  protected async getRequest<Response, Retour>(
    endpoint: string,
    mapper: (data: Response) => Retour,
    config?: AxiosRequestConfig,
  ): Promise<Either<Retour>> {
    let response;

    try {
      response = await this.client.get(endpoint, config);
      if(response.status === 204) {
        return createFailure(ErrorType.CONTENU_INDISPONIBLE);
      }
      if(response.data) {
        return createSuccess(mapper(response.data));
      } else {
        Sentry.captureMessage(`${endpoint} NO DATA IN RESPONSE`, CaptureContext.Severity.Error);
        return createFailure(ErrorType.ERREUR_INATTENDUE);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status.toString().startsWith('50')) {
          Sentry.captureMessage(`${endpoint} ERREUR 50X ${e}`, CaptureContext.Severity.Error);
          return createFailure(ErrorType.SERVICE_INDISPONIBLE);
        }
        if (e.response?.status === 400) {
          Sentry.captureMessage(`${endpoint} ERREUR 400 ${e}`, CaptureContext.Severity.Error);
          return createFailure(ErrorType.ERREUR_INATTENDUE);
        }
        if (e.response?.status === 404) {
          Sentry.captureMessage(`${endpoint} ERREUR 404 ${e}`, CaptureContext.Severity.Error);
          return createFailure(ErrorType.CONTENU_INDISPONIBLE);
        }
      }
      Sentry.captureMessage(`${endpoint} MAPPING RESPONSE ${e}`, CaptureContext.Severity.Error);
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }
  }
}
