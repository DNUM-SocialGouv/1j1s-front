import { DateTime } from "luxon";
import { log } from "util";

import { ConfigurationService } from "../../services/ConfigurationService";
import { DateService } from "../../services/date/DateService";
import { HttpClientService } from "../../services/http/HttpClientService";
import { ApiTokenRepository } from "./ApiTokenRepository";

export class ApiPoleEmploiTokenRepository implements ApiTokenRepository {
  constructor(
    private readonly dateService: DateService,
    private readonly configurationService: ConfigurationService,
    private readonly httpClientService: HttpClientService
  ) {}

  private token: string | undefined;
  private expirationDate: DateTime | undefined;

  async getToken(): Promise<string> {
    if (this.isTokenExpired(this.dateService.now())) {
      const environmentVariables = this.configurationService.getConfiguration();
      const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");
      params.append(
        "client_id",
        environmentVariables.API_POLE_EMPLOI_CLIENT_ID!
      );
      params.append(
        "client_secret",
        environmentVariables.API_POLE_EMPLOI_CLIENT_SECRET!
      );
      params.append("scope", environmentVariables.API_POLE_EMPLOI_SCOPE!);

      const endpoint =
        "https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=partenaire";

      const response = await this.httpClientService.post<TokenResponse>(
        endpoint,
        params,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      this.setTokenAndExpiration(
        response.data.access_token,
        response.data.expires_in
      );

      return response.data.access_token;
    } else {
      return this.token!;
    }
  }

  private setTokenAndExpiration(token: string, expiration: number) {
    this.token = token;
    this.expirationDate = this.dateService.nowInFuture(expiration);
  }

  private isTokenExpired(date: DateTime) {
    if (this.token == undefined && this.expirationDate == undefined)
      return true;
    return this.expirationDate!.diff(date).as("second") < 0;
  }
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
}
