import { TarteAuCitron } from '~/client/services/cookies/tarteaucitron/tarteAuCitron.cookies.service';
import { aTarteAuCitron } from '~/client/services/cookies/tarteaucitron/tarteAuCitron.fixture';

export function mockSmallScreen() {
	Object.defineProperty(window, 'matchMedia', {
		value: vi.fn().mockImplementation((query) => ({
			addEventListener: vi.fn(),
			addListener: vi.fn(),
			dispatchEvent: vi.fn(),
			matches: false, //TODO mettre à jour pour moins dépendre de l'implémentation de getScreenSize
			media: query,
			onchange: null,
			removeEventListener: vi.fn(),
			removeListener: vi.fn(),
		})),
		writable: true,
	});
}

export function mockLargeScreen() {
	Object.defineProperty(window, 'matchMedia', {
		value: vi.fn().mockImplementation((query) => ({
			addEventListener: vi.fn(),
			addListener: vi.fn(),
			dispatchEvent: vi.fn(),
			matches: true, //TODO mettre à jour pour moins dépendre de l'implémentation de getScreenSize
			media: query,
			onchange: null,
			removeEventListener: vi.fn(),
			removeListener: vi.fn(),
		})),
		writable: true,
	});
}

export function mockScrollBy() {
	Object.defineProperty(window, 'scrollBy', {
		value: vi.fn(),
	});
}

export function mockScrollIntoView() {
	window.HTMLElement.prototype.scrollIntoView = vi.fn();
}

export function mockLocalStorage({
																	 getItem = vi.fn(),
																	 setItem = vi.fn(),
																	 clear = vi.fn(),
																	 removeItem = vi.fn(),
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
																		 getItem = vi.fn(),
																		 removeItem = vi.fn(),
																		 clear = vi.fn(),
																		 setItem = vi.fn(),
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
