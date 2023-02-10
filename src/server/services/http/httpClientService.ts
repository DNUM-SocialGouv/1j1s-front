import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { HttpClientConfig } from '~/server/services/http/httpClientConfig';

export class HttpClientService {
	readonly client: AxiosInstance;

	constructor (private clientConfig: HttpClientConfig) {
		const headers = clientConfig.apiHeaders;
		const url = clientConfig.apiUrl;
		this.client = axios.create({ baseURL: url, headers });
	}

	async get<Response>(
		endpoint: string,
		config?: AxiosRequestConfig,
	): Promise<AxiosResponse<Response>> {
		console.log(this.client.getUri())
		console.log(endpoint)
		return this.client.get<Response>(endpoint, config);
	}

	async post<Body>(endpoint: string, body: Body) {
		return this.client.post(endpoint, body);
	}

	protected setAuthorizationHeader(token: string): void {
		this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
	}
}
