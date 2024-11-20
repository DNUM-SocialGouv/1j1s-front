import { ReadonlyURLSearchParams } from 'next/navigation';

const mockedUsePathname = jest.fn();
const mockedUseSearchParams = jest.fn();

jest.mock('next/navigation', () => ({
	usePathname: mockedUsePathname,
	useSearchParams: mockedUseSearchParams,
}));

export function mockUsePathname(path = '/') {
	mockedUsePathname.mockReturnValue(path);
}

export function mockUseSearchParams(overrides: Partial<ReadonlyURLSearchParams>) {

	mockedUseSearchParams.mockImplementation(() => {
		return {
			get: jest.fn(),
			getAll: jest.fn(),
			has: jest.fn(),
			size: 0,
			...overrides,
		};
	});
}
