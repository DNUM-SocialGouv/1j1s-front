import { HttpClientService } from '~/client/services/httpClient.service';

export function anHttpClientService(): HttpClientService {
	return {
		get: jest.fn(),
		post: jest.fn(),
	};
}
