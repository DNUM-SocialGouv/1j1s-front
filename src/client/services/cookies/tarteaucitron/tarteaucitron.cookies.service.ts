import { CookiesService } from '../cookies.service';
import FailedToAllowServiceError from '../FailedToAllowService.error';

export namespace TarteAuCitron {
  export type ServiceConfig<T> = Record<string, T>;
  export type InitConfig = Record<string, unknown>;
  export type User = unknown;
}
export type TarteAuCitron = {
  user: Record<string, TarteAuCitron.User>,
  services: Record<string, TarteAuCitron.ServiceConfig<unknown>>,
  init: (config: TarteAuCitron.InitConfig) => void,
  job?: string[],
  userInterface: {
    respond: (bouton: HTMLButtonElement, value: boolean) => void,
    openPanel: () => void,
  }
}

export class TarteaucitronCookiesService implements CookiesService {
	private static CONSENT_MANAGER_COOKIE_NAME = 'consentement';
	private static INIT_CONFIG = {
		AcceptAllCta: true,
		DenyAllCta: true,
		adblocker: false,
		bodyPosition: 'bottom',
		closePopup: false,
		cookieName: TarteaucitronCookiesService.CONSENT_MANAGER_COOKIE_NAME,
		cookieslist: true,
		groupServices: false,
		handleBrowserDNTRequest: false,
		hashtag: '#tarteaucitron',
		highPrivacy: true,
		iconPosition: 'BottomLeft',
		iconSrc: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiAxQzE1LjMxMzcgMSAxOCAzLjY4NjI5IDE4IDdWOEgyMEMyMC41NTIzIDggMjEgOC40NDc3MiAyMSA5VjIxQzIxIDIxLjU1MjMgMjAuNTUyMyAyMiAyMCAyMkg0QzMuNDQ3NzIgMjIgMyAyMS41NTIzIDMgMjFWOUMzIDguNDQ3NzIgMy40NDc3MiA4IDQgOEg2VjdDNiAzLjY4NjI5IDguNjg2MjkgMSAxMiAxWk0xOSAxMEg2VjIwSDE5VjEwWk05IDE3VjE5SDdWMTdIOVpNOSAxNFYxNkg3VjE0SDlaTTkgMTFWMTNIN1YxMUg5Wk0xMiAzQzkuNzkwODYgMyA4IDQuNzkwODYgOCA3VjhIMTZWN0MxNiA0Ljc5MDg2IDE0LjIwOTEgMyAxMiAzWiIgZmlsbD0iIzAwMDA5MSIvPgo8L3N2Zz4K',
		mandatory: true,
		mandatoryCta: true,
		moreInfoLink: true,
		orientation: 'middle',
		privacyUrl: '/confidentialite',
		readmoreLink: '/confidentialite',
		removeCredit: true,
		serviceDefaultState: 'wait',
		showAlertSmall: false,
		showIcon: true,
		useExternalCss: false,
		useExternalJs: false,
	};
	private readonly tarteaucitron: TarteAuCitron;

	constructor(tarteaucitron: TarteAuCitron) {
		this.tarteaucitron = tarteaucitron;
		this.tarteaucitron.init(TarteaucitronCookiesService.INIT_CONFIG);
		this.tarteaucitron.job = this.tarteaucitron.job || [];
	}

	addService(nom: string, config?: TarteAuCitron.ServiceConfig<unknown>): void {
		if (config != undefined) {
			this.tarteaucitron.services[nom] = config;
		}
		this.tarteaucitron.job?.push(nom);
	}

	addUser(userName: string, value: TarteAuCitron.User): void {
		this.tarteaucitron.user[userName] = value;
	}

	isServiceAllowed(serviceName: string): boolean {
		// NOTE (GAFI 19-05-2023): On a choisi de se servir de document.cookie
		// 	pour éviter que tarteaucitron.cookie.read nous provoque des potentielles régressions.
		const isCookieAllowedRegex = new RegExp(`(?:^|;\\s*)${TarteaucitronCookiesService.CONSENT_MANAGER_COOKIE_NAME}=(?:![^!;\\s]+)*!${serviceName}=true`);
		return isCookieAllowedRegex.test(document.cookie);
	}

	allowService(nom: string): void {
		const allowButton = document.getElementById(`${nom}Allowed`);

		if (!allowButton || !(allowButton instanceof HTMLButtonElement)) {
			throw new FailedToAllowServiceError(nom, 'bouton introuvable');
		}

		this.tarteaucitron.userInterface.respond(allowButton, true);
	}

	openPanel(): void {
		return this.tarteaucitron.userInterface.openPanel();
	}
}
