import { AxiosError, AxiosResponse, isAxiosError } from 'axios';

import { SentryException } from '~/server/exceptions/sentryException';
import {
	PublicHttpClientConfig,
	PublicHttpClientService,
} from '~/server/services/http/publicHttpClient.service';
import { LoggerService } from '~/server/services/logger.service';

export interface TokenAgent {
	 getToken(): Promise<string>
}

export interface AuthenticatedHttpClientConfig extends PublicHttpClientConfig {
	tokenAgent: TokenAgent
}

export class AuthenticatedHttpClientService extends PublicHttpClientService {
	private tokenAgent: TokenAgent;
	private readonly apiName: string;

	constructor(private config: AuthenticatedHttpClientConfig, private loggerService: LoggerService) {
		super(config);
		this.tokenAgent = config.tokenAgent;
		this.apiName = config.apiName;

		this.client.interceptors.response.use(
			(response: AxiosResponse) => response,
			(error: unknown) => {
				if (isAxiosError(error)) {
					const originalRequest = error.config;

					if (originalRequest !== undefined && this.shouldRetry(error)) {
						this.traceRetry(error);
						return this.refreshToken()
							.then(() => {
								return this.client(originalRequest);
							});
					}
				}

				return Promise.reject(error);
			},
		);
	}


	private traceRetry(error: AxiosError) {
		const originalRequest = error.config;

		// le type de `originalRequest` ne peut ni être importé de la librairie axios, ni être étendue avec un type générique
		(<typeof originalRequest & { _retry: boolean }>originalRequest)._retry = true;
	}

	private isAuthenticationError(error: AxiosError): boolean {
		// Note : 403, bien que peu standard, est le code d’erreur retourné par Strapi lors d'un défaut d'authentification
		return (error.response?.status === 401 || error.response?.status === 403);
	}

	private isRequestFirstTry(error: AxiosError): boolean {
		const originalRequest = error.config;
		return !(<typeof originalRequest & { _retry: boolean }>originalRequest)._retry;
	}

	private shouldRetry(error: AxiosError): boolean {
		return this.isAuthenticationError(error) && this.isRequestFirstTry(error);
	}

	async refreshToken(): Promise<void> {
		try {
			const accessToken = await this.tokenAgent.getToken();
			this.setAuthorizationHeader(accessToken);
		} catch (e) {
			this.loggerService.errorWithExtra(new SentryException(
				`[API ${this.apiName}] Impossible de renouveler le token`,
				{ context: 'refreshToken', source: `API ${this.apiName}` },
				{ stacktrace: (<Error>e).stack },
			));
			throw e;
		}
	}

	protected setAuthorizationHeader(token: string): void {
		this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
	}
}
