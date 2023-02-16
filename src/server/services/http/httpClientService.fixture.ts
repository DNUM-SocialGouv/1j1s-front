import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { HttpClientService } from '~/server/services/http/httpClientService';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';

function anAxiosInstance(): AxiosInstance {
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
): AxiosResponse<T> {
	return {
		config: undefined as unknown as InternalAxiosRequestConfig,
		data,
		headers: {},
		status: status || 200,
		statusText: '',
	};
}

export function anAxiosError(override?: Partial<AxiosError>): AxiosError {
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

export function anHttpClientService(): HttpClientService {
	return {
		client: anAxiosInstance(),
		get: jest.fn(),
		post: jest.fn(),
		setAuthorizationHeader: jest.fn(),
	} as unknown as HttpClientService;
}

export function anHttpClientServiceWithAuthentification(): HttpClientServiceWithAuthentification {
	return {
		client: anAxiosInstance(),
		get: jest.fn(),
		post: jest.fn(),
		refreshToken: jest.fn(),
		setAuthorizationHeader: jest.fn(),
	} as unknown as HttpClientServiceWithAuthentification;
}
