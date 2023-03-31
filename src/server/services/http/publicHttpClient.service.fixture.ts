import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { CacheAxiosResponse, InternalCacheRequestConfig } from 'axios-cache-interceptor';

import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import { CachedHttpClientService } from '~/server/services/http/cachedHttpClient.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

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

export function aCacheAxiosResponse<T>(
	data: T,
	status?: number,
	id?: string,
	cached?: boolean,
): CacheAxiosResponse<T> {
	return {
		cached: cached || false,
		config: undefined as unknown as InternalCacheRequestConfig,
		data,
		headers: {},
		id: id || '',
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

export function aPublicHttpClientService(): PublicHttpClientService {
	return {
		client: anAxiosInstance(),
		get: jest.fn(),
		post: jest.fn(),
		setAuthorizationHeader: jest.fn(),
	} as unknown as PublicHttpClientService;
}

export function aCachedHttpClientService(): CachedHttpClientService {
	return {
		client: anAxiosInstance(),
		get: jest.fn(),
		post: jest.fn(),
		setAuthorizationHeader: jest.fn(),
	} as unknown as CachedHttpClientService;
}

export function anAuthenticatedHttpClientService(): AuthenticatedHttpClientService {
	return {
		client: anAxiosInstance(),
		get: jest.fn(),
		post: jest.fn(),
		refreshToken: jest.fn(),
		setAuthorizationHeader: jest.fn(),
	} as unknown as AuthenticatedHttpClientService;
}
