import { Either } from '~/server/errors/either';

import { PostmanRepository } from './postman.repository';

export class SendRequestUseCase {
	constructor(private postmanRepository: PostmanRepository) {}

	async handle(url: string, body: string, ip: string, password: string): Promise<Either<string>> {
		return await this.postmanRepository.sendRequest(url, body, ip, password);
	}
}
