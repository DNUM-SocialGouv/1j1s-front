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
    const response = await axios.post<Record<'jwt', string>>(`${this.config.apiUrl}/auth/local`, {
      identifier: this.config.login,
      password: this.config.password,
    });
    return response.data.jwt;
  }
}
