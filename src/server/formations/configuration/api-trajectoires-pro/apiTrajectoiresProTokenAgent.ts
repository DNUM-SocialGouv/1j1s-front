import axios from 'axios';

import { TokenAgent } from '~/server/services/http/authenticatedHttpClient.service';

const MARGE_REFRESH_EN_SECONDES = 60;
const DELAI_MINIMAL_EN_SECONDES = 30;

interface TokenResponse {
	access_token: string
	expires_in: number
}

export class ApiTrajectoiresProTokenAgent implements TokenAgent {
	private cachedToken: string | null = null;
	private inflight: Promise<string> | null = null;
	private refreshTimer: ReturnType<typeof setTimeout> | null = null;

	constructor(
		private readonly apiAuthenticationUrl: string,
		private readonly clientId: string,
		private readonly clientSecret: string,
		private readonly apiKey: string,
	) {}

	async getToken(): Promise<string> {
		if (this.cachedToken) {
			return this.cachedToken;
		}
		if (!this.inflight) {
			this.inflight = this.refreshToken().finally(() => {
				this.inflight = null;
			});
		}
		return this.inflight;
	}

	destroy(): void {
		if (this.refreshTimer) {
			clearTimeout(this.refreshTimer);
			this.refreshTimer = null;
		}
		this.cachedToken = null;
	}

	private async refreshToken(): Promise<string> {
		const params = new URLSearchParams();
		params.append('grant_type', 'client_credentials');
		params.append('client_id', this.clientId);
		params.append('client_secret', this.clientSecret);

		const response = await axios.post<TokenResponse>(
			this.apiAuthenticationUrl,
			params,
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-omogen-api-key': this.apiKey,
				},
				timeout: 2000,
			},
		);

		this.cachedToken = response.data.access_token;
		this.scheduleRefresh(response.data.expires_in);

		return this.cachedToken;
	}

	private scheduleRefresh(expiresInSeconds: number): void {
		if (this.refreshTimer) {
			clearTimeout(this.refreshTimer);
		}

		const delayInMs = Math.max(expiresInSeconds - MARGE_REFRESH_EN_SECONDES, DELAI_MINIMAL_EN_SECONDES) * 1000;

		this.refreshTimer = setTimeout(() => {
			this.refreshToken().catch(() => {
				this.cachedToken = null;
			});
		}, delayInMs);

		if (this.refreshTimer.unref) {
			this.refreshTimer.unref();
		}
	}
}
