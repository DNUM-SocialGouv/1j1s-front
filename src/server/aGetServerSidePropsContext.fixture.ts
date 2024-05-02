import { GetServerSidePropsContext } from 'next';
import type { ParsedUrlQuery } from 'querystring';

type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

export function aGetServerSidePropsContext<Params extends ParsedUrlQuery>(override?: DeepPartial<GetServerSidePropsContext<Params>>) {
	return {
		query: {},
		res: { statusCode: 200 },
		...override,
	} as unknown as GetServerSidePropsContext<Params>;
}
