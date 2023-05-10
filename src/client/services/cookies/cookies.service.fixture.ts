import { CookieService } from './cookies.service';

export function aCookieService(overrides: Partial<CookieService>): CookieService {
	return {
		addCookie() {
			return;
		},
		isCookieAccepted(): boolean {
			return false;
		},
		...overrides,
	};
}
