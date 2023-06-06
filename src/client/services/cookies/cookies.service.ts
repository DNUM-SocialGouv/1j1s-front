export namespace CookiesService {
	export type ServiceConfig = Record<string, unknown>;
	export type User = unknown;
}

export interface CookiesService {
  addService(nom: string, config?: CookiesService.ServiceConfig): void;

  addUser(nom: string, value: CookiesService.User): void;

  isServiceAllowed(nom: string): boolean;

  allowService(nom: string): void;

  openPanel(): void;
}
