import axios, { AxiosRequestConfig } from 'axios';
import { AxiosCacheInstance, CacheAxiosResponse, setupCache } from 'axios-cache-interceptor';

import { HttpClientConfig } from '~/server/services/http/httpClientConfig';

export class HttpClientServiceWithCache {
	readonly client: AxiosCacheInstance;

	constructor (private clientConfig: HttpClientConfig) {
		const headers = clientConfig.apiHeaders;
		const url = clientConfig.apiUrl;
		this.client = setupCache(axios.create({ baseURL: url, headers }), { methods: ['get'] });
	}

	async get<Response>(
		endpoint: string,
		config?: AxiosRequestConfig,
	): Promise<CacheAxiosResponse<Response>> {
		return this.client.get<Response>(endpoint, config);
	}

	async post<Body>(endpoint: string, body: Body) {
		return this.client.post(endpoint, body);
	}

	protected setAuthorizationHeader(token: string): void {
		this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
	}
}
