
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

export function mockLocalStorage() {
	const localStorageMock = (function() {
		let store: Record<string, unknown> = {};
		return {
			clear: function() {
				store = {};
			},
			getItem: function(key: string) {
				return store[key] || null;
			},
			removeItem: function(key: string) {
				delete store[key];
			},
			/* eslint-disable  @typescript-eslint/no-explicit-any */
			setItem: function(key: string, value: any) {
				store[key] = value.toString();
			},
		};
	})();
	Object.defineProperty(window, 'localStorage', { value: localStorageMock });
}

export function mockSessionStorage() {
	const sessionStorageMock = (function() {
		let store: Record<string, unknown> = {};
		return {
			clear: function() {
				store = {};
			},
			getItem: function(key: string) {
				return store[key] || null;
			},
			removeItem: function(key: string) {
				delete store[key];
			},
			/* eslint-disable  @typescript-eslint/no-explicit-any */
			setItem: function(key: string, value: any) {
				store[key] = value.toString();
			},
		};
	})();
	Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock });
}


export function mockScrollBy() {
	Object.defineProperty(window, 'scrollBy', {
		value: jest.fn(),
	});
}
