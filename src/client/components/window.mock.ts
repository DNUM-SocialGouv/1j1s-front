
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

// FIXME (GAFI 17-05-2023): typage trop large
export function mockTarteAuCitron(override?: Record<string, unknown>) {
	Object.defineProperty(window, 'tarteaucitron', {
		value: {
			init: jest.fn(),
			job: undefined,
			userInterface: {
				respond: jest.fn(),
			},
			...override,
		},
	});
}
