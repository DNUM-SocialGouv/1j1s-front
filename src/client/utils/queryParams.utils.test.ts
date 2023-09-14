import { getArrayQueryParam, getSingleQueryParam } from '~/client/utils/queryParams.utils';

describe('getSingleQueryParam', () => {
	it('renvoie le param lui-même quand on donne un param unique', () => {
		const query = 'test';

		const result = getSingleQueryParam(query);

		expect(result).toEqual(query);
	});
	it('renvoie undefined quand on donne un tableau de params', () => {
		const query = ['toto', 'tata'];

		const result = getSingleQueryParam(query);

		expect(result).toEqual(undefined);
	});
	it('renvoie undefined quand on donne undefined', () => {
		const query = undefined;

		const result = getSingleQueryParam(query);

		expect(result).toEqual(undefined);
	});
});

describe('getArrayQueryParam', () => {
	it('renvoie un tableau de params quand on donne un tableau', () => {
		const queries = ['toto', 'tata'];

		const result = getArrayQueryParam(queries);

		expect(result).toEqual(queries);
	});
	it('renvoie undefined quand on donne undefined', () => {
		const queries = undefined;

		const result = getArrayQueryParam(queries);

		expect(result).toEqual(undefined);
	});
	it('renvoie un tableau de params quand on donne un tableau transformé en string', () => {
		const queries = ['toto', 'tata'];

		const result = getArrayQueryParam(queries.toString());

		expect(result).toEqual(queries);
	});
});
