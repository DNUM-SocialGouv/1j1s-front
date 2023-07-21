import { noFilter } from './noFilter';

describe('noFilter()', () => {
	it('renvoie true', () => {
		const result = noFilter();

		expect(result).toBe(true);
	});
});
