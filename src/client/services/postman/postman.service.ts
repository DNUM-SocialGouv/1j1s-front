import { HttpClientService } from '../httpClient.service';

export class PostmanService {
	constructor(private httpClientService: HttpClientService) {
	}
	sendRequest(url: string, body: string, ip: string, password: string) {
		return this.httpClientService.get<string>(`postman?url=${url}&body=${body}&ip=${ip}&password=${password}`);
	}
}
