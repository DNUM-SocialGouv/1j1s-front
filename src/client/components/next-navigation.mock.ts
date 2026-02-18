import { ReadonlyURLSearchParams } from 'next/navigation';

const mockedUsePathname = vi.fn();
const mockedUseSearchParams = vi.fn();

vi.mock('next/navigation', () => ({
	usePathname: mockedUsePathname,
	useSearchParams: mockedUseSearchParams,
}));

export function mockUsePathname(path = '/') {
	mockedUsePathname.mockReturnValue(path);
}

export function mockUseSearchParams(overrides: Partial<ReadonlyURLSearchParams>) {

	mockedUseSearchParams.mockImplementation(() => {
		return {
			get: vi.fn(),
			getAll: vi.fn(),
			has: vi.fn(),
			size: 0,
			...overrides,
		};
	});
}
