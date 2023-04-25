import { NextRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

interface MockUseRouter {
	route?: string
	pathname?: string
	query?: ParsedUrlQuery
	asPath?: string
	prefetch?: jest.Mock
	push?: jest.Mock
	replace?: jest.Mock
	reload?: jest.Mock
	back?: jest.Mock
}

export function mockUseRouter({ asPath = '', pathname = '', query = {}, route = '', prefetch = jest.fn(), push = jest.fn(), reload = jest.fn(), replace = jest.fn(), back = jest.fn() }: MockUseRouter) {
	useRouter.mockImplementation(() => ({
		asPath,
		back,
		pathname,
		prefetch,
		push,
		query,
		reload,
		replace,
		route,
	} as unknown as NextRouter));
}

export const createMockRouter = (router?: Partial<NextRouter>): NextRouter => {
	return {
		asPath: '/',
		back: jest.fn(),
		basePath: '',
		beforePopState: jest.fn(),
		defaultLocale: 'en',
		domainLocales: [],
		events: {
			emit: jest.fn(),
			off: jest.fn(),
			on: jest.fn(),
		},
		forward: jest.fn(),
		isFallback: false,
		isLocaleDomain: false,
		isPreview: false,
		isReady: true,
		pathname: '/',
		prefetch: jest.fn(),
		push: jest.fn(),
		query: {},
		reload: jest.fn(),
		replace: jest.fn(),
		route: '/',
		...router,
	};
};
