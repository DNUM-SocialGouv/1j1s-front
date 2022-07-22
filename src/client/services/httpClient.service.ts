import { uuid4 } from '@sentry/utils';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import { LoggerService } from '~/client/services/logger.service';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';

export class HttpClientService {
  readonly client: AxiosInstance;

  constructor(sessionId: string, private logger: LoggerService) {
    this.client = axios.create({
      baseURL: 'api',
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
      const response = await this.client.get(resource, config);
      return createSuccess(response.data as Response);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if(e.response?.status === 500) {
          return createFailure(ErrorType.SERVICE_INDISPONIBLE);
        }
        if(e.response?.status === 400) {
          return createFailure(ErrorType.DEMANDE_INCORRECTE);
        }
        if(e.response?.status === 404) {
          return createFailure(ErrorType.CONTENU_INDISPONIBLE);
        }
      }
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }
  }
}
