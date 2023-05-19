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
	}
}

export interface CookiesService {
	addService(nom: string, config?: TarteAuCitron.ServiceConfig<unknown>): void;
	addUser(nom: string, value: TarteAuCitron.User): void;
	isServiceAllowed(nom: string): boolean;
}

export class TarteAuCitronService implements CookiesService {
	public static CONSENT_MANAGER_COOKIE_NAME = 'consentement';
	private readonly tarteaucitron: TarteAuCitron;
	constructor(tarteaucitron: TarteAuCitron) {
		this.tarteaucitron = tarteaucitron;
		this.tarteaucitron.init({
			AcceptAllCta: true,
			DenyAllCta: true,
			adblocker: false,
			bodyPosition: 'bottom',
			closePopup: false,
			cookieName: TarteAuCitronService.CONSENT_MANAGER_COOKIE_NAME,
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
		});
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
		const filteredConsentementCookieParts = document.cookie.match(new RegExp('(^| )' + TarteAuCitronService.CONSENT_MANAGER_COOKIE_NAME + '=([^;]+)'));
		if (filteredConsentementCookieParts) {
			const consentementCookieValue: string = filteredConsentementCookieParts[2];
			return consentementCookieValue?.split('!')
				?.reduce((consentements: Record<string, unknown>, consentementCourant: string) => {
					const [key, value]: string[] = consentementCourant.split('=');
					return { ...consentements, [key]: value !== 'false' };
				}, {})?.[serviceName] as unknown as boolean;
		} else {
			return false;
		}
	}
}

export class NullCookiesService implements CookiesService {
	isServiceAllowed(): boolean {
		return false;
	}
	addUser(): void {
		return;
	}
	addService(): void {
		return;
	}
}
