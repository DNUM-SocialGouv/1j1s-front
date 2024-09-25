import { NextRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

// eslint-disable-next-line @typescript-eslint/no-require-imports
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
	isReady?: boolean
}

export function mockUseRouter(overrides: Partial<MockUseRouter>) {
	const routerMock = { asPath : '',
		back : jest.fn(),
		isReady : true,
		pathname : '',
		prefetch : jest.fn(),
		push : jest.fn(),
		query : {},
		reload : jest.fn(),
		replace : jest.fn(),
		route : '',
		...overrides };
	useRouter.mockImplementation(() => (routerMock));
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
