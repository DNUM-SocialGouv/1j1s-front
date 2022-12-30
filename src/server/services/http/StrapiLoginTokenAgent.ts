import axios from 'axios';

import { TokenAgent } from './httpClientConfig';

interface StrapiLoginTokenAgentConfig {
  apiUrl: string
  login: string
  password: string
}
export class StrapiLoginTokenAgent implements TokenAgent {
	constructor (private config: StrapiLoginTokenAgentConfig) {
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
