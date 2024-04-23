import { AxiosRequestConfig } from 'axios';

import { Either } from '~/server/errors/either';

export interface HttpClientService {
	get<Response>(resource: string, config?: AxiosRequestConfig,): Promise<Either<Response>>
	post<Body, Response = undefined>(resource: string, body: Body, config?: AxiosRequestConfig,): Promise<Either<Response>>
}
