import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { HttpClientWithAuthentificationConfig, TokenAgent } from '~/server/services/http/httpClientConfig';
import { HttpClientService } from '~/server/services/http/httpClientService';
import { LoggerService } from '~/server/services/logger.service';

export class HttpClientServiceWithAuthentification extends HttpClientService {
	private tokenAgent: TokenAgent;
	private isRefreshingToken?: Promise<void>;
	private readonly apiName: string;

	constructor (private config: HttpClientWithAuthentificationConfig) {
		super(config);
		this.tokenAgent = config.tokenAgent;
		this.apiName = config.apiName;
	}

	async get<Response>(
		endpoint: string,
		config?: AxiosRequestConfig,
	): Promise<AxiosResponse<Response>> {
		const makeRequest = () => super.get<Response>(endpoint, config);
		return this.makeRequestWithRetry<Response>(makeRequest);
	}

	async post<Body, Response>(
		endpoint: string,
		body: Body,
	): Promise<AxiosResponse<Response>> {
		const makeRequest = () => super.post(endpoint, body);
		return this.makeRequestWithRetry<Response>(makeRequest);
	}

	private async makeRequestWithRetry<Response> (makeRequest: () => Promise<AxiosResponse<Response>>): Promise<AxiosResponse<Response>> {
		try {
			return await makeRequest();
		} catch (error: unknown) {
			if (!this.shouldRetry(error)) {
				throw error;
			}
			try {
				await this.refreshToken();
			} catch (authError) {
				LoggerService.error(`[ API ${this.apiName}] failed to refresh token ${authError}`);
				throw error;
			}
			return await makeRequest();
		}
	}

	private shouldRetry(error: unknown): error is AxiosError {
		if (!axios.isAxiosError(error)) {
			return false;
		}
		return error.response?.status === 401 || error.response?.status === 403;
	}

	async refreshToken(): Promise<void> {
		if (this.isRefreshingToken) {
			return this.isRefreshingToken;
		}
		return this.isRefreshingToken = this.tokenAgent.getToken()
			.then((token) => {
				this.setAuthorizationHeader(token);
			})
			.finally(() => {
				delete this.isRefreshingToken;
			});
	}
}
