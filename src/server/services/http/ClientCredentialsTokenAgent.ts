import axios from 'axios';

interface ClientCredentialsTokenAgentConnectInfo {
  url: string
  scope: string
  clientId: string
  clientSecret: string
  query?: Record<string, string>
}
export class ClientCredentialsTokenAgent {
	private readonly url: string;
	private readonly scope: string;
	private readonly clientId: string;
	private readonly clientSecret: string;
	private readonly query: Record<string, string> = {};

	constructor (info: ClientCredentialsTokenAgentConnectInfo) {
		this.clientId = info.clientId;
		this.clientSecret = info.clientSecret;
		this.scope = info.scope;
		this.url = info.url;
		if (info.query) this.query = info.query;
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
