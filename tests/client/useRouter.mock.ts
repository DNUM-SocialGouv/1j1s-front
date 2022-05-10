import { NextRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

interface MockUseRouter {
  route?: string
  pathname?: string
  query?: ParsedUrlQuery
  asPath?: string
  push?: jest.Mock
  replace?: jest.Mock
}

export function mockUseRouter({ asPath = '', pathname = '', query = {}, route = '', push = jest.fn(), replace = jest.fn() }: MockUseRouter) {
  useRouter.mockImplementation(() => ({
    asPath,
    pathname,
    push,
    query,
    replace,
    route,
  } as unknown as NextRouter));
}

export function mockUseRouterOnce({ asPath = '', pathname = '', query = {}, route = '', push = jest.fn(), replace = jest.fn() }: MockUseRouter) {
  useRouter.mockImplementationOnce(() => ({
    asPath,
    pathname,
    push,
    query,
    replace,
    route,
  } as unknown as NextRouter));
}
