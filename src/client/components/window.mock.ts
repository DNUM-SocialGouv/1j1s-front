import { TarteAuCitron } from '~/client/services/cookies/tarteaucitron/tarteAuCitron.cookies.service';
import { aTarteAuCitron } from '~/client/services/cookies/tarteaucitron/tarteAuCitron.fixture';

export function mockSmallScreen() {
	Object.defineProperty(window, 'matchMedia', {
		value: jest.fn().mockImplementation((query) => ({
			addEventListener: jest.fn(),
			addListener: jest.fn(),
			dispatchEvent: jest.fn(),
			matches: false, //TODO mettre à jour pour moins dépendre de l'implémentation de getScreenSize
			media: query,
			onchange: null,
			removeEventListener: jest.fn(),
			removeListener: jest.fn(),
		})),
		writable: true,
	});
}

export function mockLargeScreen() {
	Object.defineProperty(window, 'matchMedia', {
		value: jest.fn().mockImplementation((query) => ({
			addEventListener: jest.fn(),
			addListener: jest.fn(),
			dispatchEvent: jest.fn(),
			matches: true, //TODO mettre à jour pour moins dépendre de l'implémentation de getScreenSize
			media: query,
			onchange: null,
			removeEventListener: jest.fn(),
			removeListener: jest.fn(),
		})),
		writable: true,
	});
}

export function mockScrollBy() {
	Object.defineProperty(window, 'scrollBy', {
		value: jest.fn(),
	});
}

export function mockScrollIntoView() {
	window.HTMLElement.prototype.scrollIntoView = jest.fn();
}

export function mockLocalStorage({
																	 getItem = jest.fn(),
																	 setItem = jest.fn(),
																	 clear = jest.fn(),
																	 removeItem = jest.fn(),
																 }) {
	Object.defineProperty(window, 'localStorage', {
		value: {
			clear,
			getItem,
			removeItem,
			setItem,
		},
	});
}

export function mockSessionStorage({
																		 getItem = jest.fn(),
																		 removeItem = jest.fn(),
																		 clear = jest.fn(),
																		 setItem = jest.fn(),
																	 }) {
	Object.defineProperty(window, 'sessionStorage', {
		value: {
			clear,
			getItem,
			removeItem,
			setItem,
		},
	});
}

export function mockTarteAuCitron(override?: Partial<TarteAuCitron>) {
	Object.defineProperty(window, 'tarteaucitron', {
		value: aTarteAuCitron(override),
		writable: true,
	});
}

export function mockUUID(override?: string) {
	Object.defineProperty(window, 'crypto', {
		value: {
			randomUUID: () => override ?? '1b376eeb-87b8-451f-9735-32a885a0839a',
		},
	});
}
