import { aTarteAuCitron } from '~/client/services/cookies/cookies.service.fixture';
import { TarteAuCitron } from '~/client/services/cookies/tarteaucitron.service';

export function mockSmallScreen() {
	Object.defineProperty(window, 'matchMedia', {
		value: jest.fn().mockImplementation((query) => ({
			addEventListener: jest.fn(),
			addListener: jest.fn(),
			dispatchEvent: jest.fn(),
			matches: false,
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
			matches: true,
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
