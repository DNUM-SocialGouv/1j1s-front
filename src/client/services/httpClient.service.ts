import { uuid4 } from "@sentry/utils";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { LoggerService } from "~/client/services/logger.service";

export class HttpClientService {
  readonly client: AxiosInstance;

  constructor(sessionId: string, private logger: LoggerService) {
    this.client = axios.create({
      baseURL: "api",
      headers: {
        "content-type": "application/json",
        "x-session-id": sessionId,
      },
    });

    this.client.interceptors.request.use(
      (request: AxiosRequestConfig) => {
        if (!request.headers) {
          request.headers = {};
        }
        const transactionId = uuid4();
        request.headers["x-transaction-id"] = transactionId;
        this.logger.setTransactionId(transactionId);
        return request;
      },
      (error: AxiosError) => Promise.reject(error)
    );
  }

  async get<T>(
    resource: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.get(resource, config);
  }

  async post<T>(
    resource: string,
    body?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.post(resource, body, config);
  }

  async put<T>(
    resource: string,
    body: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.put(resource, body, config);
  }

  async delete<T>(
    resource: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.delete(resource, config);
  }
}
