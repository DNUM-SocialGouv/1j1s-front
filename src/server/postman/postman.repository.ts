import { uuid4 } from '@sentry/utils';
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

export class PostmanRepository {
	readonly client: AxiosInstance;
	
	constructor(
	) {
		this.client = axios.create({
			baseURL: '/api',
			headers: {
				'content-type': 'application/json',
			},
		});

		this.client.interceptors.request.use(
			(request: InternalAxiosRequestConfig) => {
				request.headers['x-transaction-id'] = uuid4();
				return request;
			},
			(error: AxiosError) => Promise.reject(error),
		);
	}
	
	async sendRequest(url: string, body: string, ip: string, password: string): Promise<Either<string>> {
		try {
			const passwordFromEnv = process.env.POSTMAN_PASSWORD;
			if (passwordFromEnv !== password) {
				return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
			}
			this.client.defaults.headers.common['Accept-Language'] = 'fr';
			this.client.defaults.headers.common['Accept'] = 'application/json';
			this.client.defaults.headers.common['isScoped'] = 'true';
			this.client.defaults.headers.common['Charset'] = 'utf-8';
			this.client.defaults.headers.common['Client-IP'] = ip;
			this.client.defaults.headers.common['Content-Type'] = 'application/json';
			const result = await this.client.post(url, body);
			return createSuccess(`Status Code : ${result.status} - ${JSON.stringify(result.data)}`);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return createSuccess(`Status Code : ${error.response?.status} - ${error.response?.data}`);
			}
			return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
		}
	}
}
