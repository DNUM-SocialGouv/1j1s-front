import axios from 'axios';

import { TokenAgent } from '~/server/services/http/authenticatedHttpClient.service';

interface StrapiTokenAgentConfig {
	apiUrl: string
	login: string
	password: string
}

export class StrapiTokenAgent implements TokenAgent {
	constructor(private config: StrapiTokenAgentConfig) {
	}

	async getToken() {
		const endpoint = this.config.apiUrl.endsWith('/')
			? `${this.config.apiUrl}auth/local`
			: `${this.config.apiUrl}/auth/local`;
		const response = await axios.post<Record<'jwt', string>>(endpoint, {
			identifier: this.config.login,
			password: this.config.password,
		});
		return response.data.jwt;
	}
}
