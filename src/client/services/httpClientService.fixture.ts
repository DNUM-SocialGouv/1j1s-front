import { HttpClientService } from './httpClient.service';

export function anHttpClientService(): HttpClientService {
	return {
		get: vi.fn(),
		post: vi.fn(),
	};
}
