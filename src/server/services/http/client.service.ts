import * as Sentry from '@sentry/nextjs';
import * as CaptureContext from '@sentry/types';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';

import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';

export type ClientResponse<T> = { status: number, data: T };

export abstract class ClientService {
  readonly client: AxiosInstance;

  abstract get<Response, Retour>(
    endpoint: string,
    mapper: (data: Response) => Retour,
    config?: AxiosRequestConfig,
  ): Promise<Either<ClientResponse<Retour>>>;

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
  ): Promise<Either<ClientResponse<Retour>>> {
    let response;

    try {
      response = await this.client.get(endpoint, config);
      if(response.status === 204) {
        return createFailure(ErrorType.CONTENU_INDISPONIBLE);
      }
      if(response.data) {
        return createSuccess({
          data: mapper(response.data),
          status: response.status,
        });
      } else {
        Sentry.captureMessage(`${endpoint} pas de donnée dans la réponse`, CaptureContext.Severity.Error);
        return createFailure(ErrorType.ERREUR_INATTENDUE);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status.toString().startsWith('50')) {
          return createFailure(ErrorType.SERVICE_INDISPONIBLE);
        }
      }
      Sentry.captureMessage(`${endpoint} ${e}`, CaptureContext.Severity.Error);
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }
  }
}
