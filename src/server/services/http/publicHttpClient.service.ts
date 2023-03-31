import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

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
		return this.client.get<Response>(endpoint, config);
	}

	async post<Body, Response>(endpoint: string, body: Body): Promise<AxiosResponse<Response>> {
		return this.client.post<Response>(endpoint, body);
	}
}
