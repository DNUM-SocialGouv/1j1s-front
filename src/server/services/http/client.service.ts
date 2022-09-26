import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';

import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { LoggerService } from '~/server/services/logger.service';

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
          LoggerService.error(`${apiName} ${error.response.status} ${error.config.baseURL}${error.config.url}`);
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
        return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
      }
      if(response.data) {
        return createSuccess(mapper(response.data));
      } else {
        LoggerService.error(`${endpoint} PAS DE DATA`);
        return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status.toString().startsWith('50')) {
          LoggerService.error(`${endpoint} ERREUR 50X ${e}`);
          return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
        }
        if (e.response?.status === 400) {
          LoggerService.error(`${endpoint} ERREUR 400 ${e}`);
          return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
        }
        if (e.response?.status === 404) {
          LoggerService.error(`${endpoint} ERREUR 404 ${e}`);
          return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
        }
        if (e.response?.status === 401) {
          LoggerService.error(`${endpoint} ERREUR 401 ${e}`);
          return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
        }
      }
      LoggerService.error(`${endpoint} PROBLEME MAPPING ${e}`);
      return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
    }
  }
}
