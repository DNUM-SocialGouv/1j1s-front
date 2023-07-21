/**
 * @jest-environment jsdom
 */

import { filterValueOrLabelStartsWith } from './filterValueOrLabelStartsWith';

describe('filterValueOrLabelStartsWith()', () => {
	it("renvoie true quand le label de l'option commence par la valeur actuelle", () => {
		const option = document.createElement('li');
		option.textContent = 'Test';

		const result = filterValueOrLabelStartsWith(option, 'Te');

		expect(result).toBe(true);
	});
	it("renvoie true quand la value de l'option commence par la valeur actuelle", () => {
		const option = document.createElement('li');
		option.setAttribute('data-value', 'Test');

		const result = filterValueOrLabelStartsWith(option, 'Te');

		expect(result).toBe(true);
	});
	it("renvoie false quand ni le label ni la value de l'option ne commence par la valeur actuelle", () => {
		const option = document.createElement('li');
		option.setAttribute('data-value', 'Test');
		option.textContent = 'Test';

		const result = filterValueOrLabelStartsWith(option, 'es');

		expect(result).toBe(false);
	});
	it('match indépendamment de la casse', () => {
		const option = document.createElement('li');
		option.textContent = 'Test';

		const result = filterValueOrLabelStartsWith(option, 'test');

		expect(result).toBe(true);
	});
});
