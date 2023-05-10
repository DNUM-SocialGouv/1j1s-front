import { CookieService } from './cookies.service';

export function aCookieService(overrides: Partial<CookieService>): CookieService {
	return {
		isCookieAccepted(): boolean {
			return false;
		},
		...overrides,
	};
}
