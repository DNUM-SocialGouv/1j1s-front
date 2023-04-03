import axios, { AxiosRequestConfig } from 'axios';
import { AxiosCacheInstance, CacheAxiosResponse, setupCache } from 'axios-cache-interceptor';

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
		return this.client.get<Response>(endpoint, config);
	}

	async post<Body>(endpoint: string, body: Body) {
		return this.client.post(endpoint, body);
	}
}
