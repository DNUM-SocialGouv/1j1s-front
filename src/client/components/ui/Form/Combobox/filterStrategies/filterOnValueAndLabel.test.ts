/**
 * @jest-environment jsdom
 */

import { filterOnValueAndLabel } from './filterOnValueAndLabel';

describe('filterOnValueAndLabel()', () => {
	it("renvoie true quand le label de l'option contient la valeur actuelle", () => {
		const option = document.createElement('li');
		option.textContent = 'Test';

		const result = filterOnValueAndLabel(option, 'es');

		expect(result).toBe(true);
	});
	it("renvoie true quand la value de l'option contient la valeur actuelle", () => {
		const option = document.createElement('li');
		option.setAttribute('data-value', 'Test');

		const result = filterOnValueAndLabel(option, 'es');

		expect(result).toBe(true);
	});
	it("renvoie false quand ni le label ni la value de l'option ne contiennent la valeur actuelle", () => {
		const option = document.createElement('li');
		option.setAttribute('data-value', 'Test');
		option.textContent = 'Test';

		const result = filterOnValueAndLabel(option, 'A');

		expect(result).toBe(false);
	});
	it('match indépendamment de la casse', () => {
		const option = document.createElement('li');
		option.textContent = 'Test';

		const result = filterOnValueAndLabel(option, 'test');

		expect(result).toBe(true);
	});
});
