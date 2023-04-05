import axios, { AxiosRequestConfig } from 'axios';
import { AxiosCacheInstance, CacheAxiosResponse, setupCache } from 'axios-cache-interceptor';

import { HttpError } from '~/server/services/http/httpError';
import { PublicHttpClientConfig } from '~/server/services/http/publicHttpClient.service';

export class CachedHttpClientService {
	readonly client: AxiosCacheInstance;

	constructor (private clientConfig: PublicHttpClientConfig) {
		const headers = clientConfig.apiHeaders;
		const url = clientConfig.apiUrl;
		this.client = setupCache(axios.create({ baseURL: url, headers }), { methods: ['get'] });
	}

	async get<Response>(
		endpoint: string,
		config?: AxiosRequestConfig,
	): Promise<CacheAxiosResponse<Response>> {
		try {
			return this.client.get<Response>(endpoint, config);
		} catch (e) {
			if (axios.isAxiosError(e) && e.response) {
				throw new HttpError(e.response.status, e.response.data.message, e.response);
			}
			throw e;
		}
	}

	async post<Body>(endpoint: string, body: Body) {
		try {
			return this.client.post(endpoint, body);
		} catch (e) {
			if (axios.isAxiosError(e) && e.response) {
				throw new HttpError(e.response.status, e.response.data.message, e.response);
			}
			throw e;
		}
	}
}
