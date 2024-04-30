import { HttpClientService } from './httpClient.service';

export function anHttpClientService(): HttpClientService {
	return {
		get: jest.fn(),
		post: jest.fn(),
	};
}
