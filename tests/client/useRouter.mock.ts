import { NextRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

interface MockUseRouter {
  route?: string
  pathname?: string
  query?: string
  asPath?: string
}

export function mockUseRouter({ asPath = '', pathname = '', query = '', route = '' }: MockUseRouter) {
  useRouter.mockImplementationOnce(() => ({
    asPath,
    pathname,
    query,
    route,
  } as unknown as NextRouter));
}
