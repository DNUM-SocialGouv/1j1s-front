import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export function anAxiosInstance(): AxiosInstance {
  return {
    defaults: {
      headers: {
        common: {},
      },
    },
    delete: jest.fn(),
    get: jest.fn(),
    interceptors: {
      request: {
        eject: jest.fn(),
        use: jest.fn(),
      },
      response: {
        eject: jest.fn(),
        use: jest.fn(),
      },
    },
    post: jest.fn(),
    put: jest.fn(),
  } as any as AxiosInstance;
}

export function anAxiosResponse<T>(
  data: T,
  status?: number,
  headers?: any
): AxiosResponse<T> {
  return {
    config: undefined as unknown as AxiosRequestConfig,
    data,
    headers,
    status: status || 200,
    statusText: "",
  };
}
