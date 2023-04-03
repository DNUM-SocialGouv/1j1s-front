import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { HttpError } from '~/server/services/http/httpError';

export interface PublicHttpClientConfig {
	apiName: string
	apiUrl: string
	apiHeaders?: Record<string, string>
}

export class PublicHttpClientService {
	readonly client: AxiosInstance;

	constructor (private clientConfig: PublicHttpClientConfig) {
		const headers = clientConfig.apiHeaders;
		const url = clientConfig.apiUrl;
		this.client = axios.create({ baseURL: url, headers });
	}

	async get<Response>(
		endpoint: string,
		config?: AxiosRequestConfig,
	): Promise<AxiosResponse<Response>> {
		try {
			return this.client.get<Response>(endpoint, config);
		} catch (e) {
			if (axios.isAxiosError(e) && e.response) {
				throw new HttpError(e.response.status, e.response.data.message, e.response);
			}
			throw e;
		}
	}

	async post<Body, Response>(endpoint: string, body: Body): Promise<AxiosResponse<Response>> {
		try {
			return this.client.post<Response>(endpoint, body);
		} catch (e) {
			if (axios.isAxiosError(e) && e.response) {
				throw new HttpError(e.response.status, e.response.data.message, e.response);
			}
			throw e;
		}
	}

	protected setAuthorizationHeader(token: string): void {
		this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
	}
}
