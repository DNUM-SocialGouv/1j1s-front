import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, RawAxiosResponseHeaders } from 'axios';

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
  } as unknown as AxiosInstance;
}

export function anAxiosResponse<T>(
  data: T,
  status?: number,
  headers: RawAxiosResponseHeaders = {},
): AxiosResponse<T> {
  return {
    config: undefined as unknown as AxiosRequestConfig,
    data,
    headers,
    status: status || 200,
    statusText: '',
  };
}

export function anAxiosError(override: Partial<AxiosError>): AxiosError {
  return {
    config: {},
    isAxiosError: true,
    message: '',
    name: '',
    response: anAxiosResponse({}),
    stack: '',
    status: '400',
    toJSON(): object {return {};},
    ...override,
  } as unknown as AxiosError;
}
