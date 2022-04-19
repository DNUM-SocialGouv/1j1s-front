import { CacheService } from "../../services/cache/CacheService";
import { ConfigurationService } from "../../services/ConfigurationService";
import { DateService } from "../../services/date/DateService";
import { ClientService } from "../../services/http/ClientService";
import { ApiTokenRepository } from "./ApiTokenRepository";

export class ApiPoleEmploiTokenRepository implements ApiTokenRepository {
  private API_POLE_EMPLOI_TOKEN = "API_POLE_EMPLOI_TOKEN";
  private API_POLE_EMPLOI_TOKEN_EXPIRATION_DATE =
    "API_POLE_EMPLOI_TOKEN_EXPIRATION_DATE";

  constructor(
    private readonly dateService: DateService,
    private readonly configurationService: ConfigurationService,
    private readonly clientService: ClientService,
    private readonly cacheService: CacheService
  ) {}

  async getToken(): Promise<string> {
    const tokenExpirationDate = await this.cacheService.get(
      this.API_POLE_EMPLOI_TOKEN_EXPIRATION_DATE
    );
    if (await this.isTokenExpired(Number(tokenExpirationDate))) {
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

      const response = await this.clientService.post<TokenResponse>(
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
      const token = await this.cacheService.get(this.API_POLE_EMPLOI_TOKEN);
      return JSON.parse(token!);
    }
  }

  private setTokenAndExpiration(token: string, expiration: number) {
    this.cacheService.set(this.API_POLE_EMPLOI_TOKEN, token);
    this.cacheService.set(
      this.API_POLE_EMPLOI_TOKEN_EXPIRATION_DATE,
      this.dateService.now() + expiration
    );
  }

  private async isTokenExpired(date: number | undefined): Promise<boolean> {
    const token = await this.cacheService.get(this.API_POLE_EMPLOI_TOKEN);
    if (token == null) return true;
    return this.dateService.isDateInPast(date!);
  }
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
}
