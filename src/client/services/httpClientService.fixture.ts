import { HttpClientService } from './httpClient.service';

export function anHttpClientService(): HttpClientService {
	return {
		delete: jest.fn(),
		get: jest.fn(),
		post: jest.fn(),
		put: jest.fn(),
	} as unknown as HttpClientService;
}
