import axios from 'axios';

interface PoleEmploiTokenAgentConfig {
  url: string
  scope: string
  clientId: string
  clientSecret: string
}

export class PoleEmploiTokenAgent {
	private readonly url: string;
	private readonly scope: string;
	private readonly clientId: string;
	private readonly clientSecret: string;

	constructor (config: PoleEmploiTokenAgentConfig) {
		this.clientId = config.clientId;
		this.clientSecret = config.clientSecret;
		this.scope = config.scope;
		this.url = config.url;
	}

	async getToken(): Promise<string> {
		const params = new URLSearchParams();
		params.append('grant_type', 'client_credentials');
		params.append('client_id', this.clientId);
		params.append('client_secret', this.clientSecret);
		params.append('scope', this.scope);

		const response = await axios.post<TokenResponse>(
			this.url,
			params,
			{
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			},
		);

		return response.data.access_token;
	}
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
}
