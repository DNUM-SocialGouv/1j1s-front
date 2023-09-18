import { PostmanRepository } from './postman.repository';
import { SendRequestUseCase } from './sendRequest.useCase';


export interface PostmanDependencies {
	sendRequest: SendRequestUseCase
}

export function postmanDependenciesContainer(postmanRepository: PostmanRepository): PostmanDependencies {
	return {
		sendRequest: new SendRequestUseCase(postmanRepository),
	};
}
