import axios from 'axios';

import { TokenAgent } from '~/server/services/http/authenticatedHttpClient.service';

interface ApiTrajectoiresProLoginResponse {
	token: string
}

export class ApiTrajectoiresProTokenAgent implements TokenAgent {
	constructor(
		private readonly apiAuthenticationUrl: string,
		private readonly username: string,
		private readonly password: string,
	) {}
	
	async getToken(): Promise<string> {
		const response = await axios.post<ApiTrajectoiresProLoginResponse>(
			this.apiAuthenticationUrl,
			{
				password: this.password,
				username: this.username,
			},
			{
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			},
		);
		
		return response.data.token;
	}
}
