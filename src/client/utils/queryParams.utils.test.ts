import { getArrayQueryParam, getSingleQueryParam } from '~/client/utils/queryParams.utils';

describe('getSingleQueryParam', () => {
	it('renvoie le param quand donné un param unique', () => {
		const query = 'test';

		const result = getSingleQueryParam(query);

		expect(result).toEqual(query);
	});
	it('renvoie undefined quand donné un tableau de params', () => {
		const query = ['toto', 'tata'];

		const result = getSingleQueryParam(query);

		expect(result).toEqual(undefined);
	});
	it('renvoie undefined quand donné undefined', () => {
		const query = undefined;

		const result = getSingleQueryParam(query);

		expect(result).toEqual(undefined);
	});
});

describe('getArrayQueryParam', () => {
	it('renvoie un tableau de params quand donné un tableau', () => {
		const queries = ['toto', 'tata'];

		const result = getArrayQueryParam(queries);

		expect(result).toEqual(queries);
	});
	it('renvoie undefined quand donné undefined', () => {
		const queries = undefined;

		const result = getArrayQueryParam(queries);

		expect(result).toEqual(undefined);
	});
	it('renvoie un tableau de params quand donné un tableau transformé en string', () => {
		const queries = ['toto', 'tata'];

		const result = getArrayQueryParam(queries.toString());

		expect(result).toEqual(queries);
	});
});
