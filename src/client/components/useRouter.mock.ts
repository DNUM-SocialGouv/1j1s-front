import { type Mock } from 'vitest';

import { NextRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const useRouter = vi.spyOn(require('next/router'), 'useRouter');

interface MockUseRouter {
	route?: string
	pathname?: string
	query?: ParsedUrlQuery
	asPath?: string
	prefetch?: Mock
	push?: Mock
	replace?: Mock
	reload?: Mock
	back?: Mock
	isReady?: boolean
}

export function mockUseRouter(overrides: Partial<MockUseRouter>) {
	const routerMock = { asPath : '',
		back : vi.fn(),
		isReady : true,
		pathname : '',
		prefetch : vi.fn(),
		push : vi.fn(),
		query : {},
		reload : vi.fn(),
		replace : vi.fn(),
		route : '',
		...overrides };
	useRouter.mockImplementation(() => (routerMock));
}

export const createMockRouter = (router?: Partial<NextRouter>): NextRouter => {
	return {
		asPath: '/',
		back: vi.fn(),
		basePath: '',
		beforePopState: vi.fn(),
		defaultLocale: 'en',
		domainLocales: [],
		events: {
			emit: vi.fn(),
			off: vi.fn(),
			on: vi.fn(),
		},
		forward: vi.fn(),
		isFallback: false,
		isLocaleDomain: false,
		isPreview: false,
		isReady: true,
		pathname: '/',
		prefetch: vi.fn(),
		push: vi.fn(),
		query: {},
		reload: vi.fn(),
		replace: vi.fn(),
		route: '/',
		...router,
	};
};
