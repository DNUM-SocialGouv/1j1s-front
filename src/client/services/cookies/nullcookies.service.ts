import { CookiesService } from './cookies.service.interface';

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

	allowService(): void {
		return;
	}

	openPanel(): void {
		return;
	}
}
