import { uuid4 } from '@sentry/utils';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import { LoggerService } from '~/client/services/logger.service';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

export class HttpClientService {
  readonly client: AxiosInstance;

  constructor(sessionId: string, private logger: LoggerService) {
    this.client = axios.create({
      baseURL: '/api',
      headers: {
        'content-type': 'application/json',
        'x-session-id': sessionId,
      },
    });

    this.client.interceptors.request.use(
      (request: AxiosRequestConfig) => {
        if (!request.headers) {
          request.headers = {};
        }
        const transactionId = uuid4();
        request.headers['x-transaction-id'] = transactionId;
        this.logger.setTransactionId(transactionId);
        return request;
      },
      (error: AxiosError) => Promise.reject(error),
    );
  }

  async get<Response>(
    resource: string,
    config?: AxiosRequestConfig,
  ): Promise<Either<Response>> {
    try {
      const response = await this.client.get<Response>(resource, config);
      return createSuccess(response.data);
    } catch (e) {
      return this.handleError(e);
    }
  }

  async post<Body, Response = undefined>(
    resource: string,
    body: Body,
    config?: AxiosRequestConfig,
  ): Promise<Either<Response>> {
    try {
      const response = await this.client.post<Response>(resource, body, config);
      return createSuccess(response.data);
    } catch (e) {
      return this.handleError(e);
    }
  }

  private handleError(e: unknown) {
    if (axios.isAxiosError(e)) {
      if(e.response?.status.toString().startsWith('50')) {
        return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
      }
      if(e.response?.status === 400) {
        return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
      }
      if(e.response?.status === 404) {
        return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
      }
    }
    return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
  }
}
