export interface ApiTokenRepository {
  getToken(): Promise<string>;
}
