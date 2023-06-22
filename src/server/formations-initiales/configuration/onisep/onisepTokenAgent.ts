import axios from 'axios';

import { TokenAgent } from '../../../services/http/authenticatedHttpClient.service';

interface OnisepLoginResponse {
	token: string,
}

export class OnisepTokenAgent implements TokenAgent {

	constructor(
		private readonly apiAuthenticationUrl: string,
		private readonly email: string,
		private readonly password: string,
	) {}

	async getToken(): Promise<string> {
		const response = await axios.post<OnisepLoginResponse>(
			this.apiAuthenticationUrl,
			{
				body: {
					email: this.email,
					password: this.password,
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			},
		);

		return response.data.token;
	}
}
