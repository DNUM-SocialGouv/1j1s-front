/**
 * @jest-environment jsdom
 */

import { JsDateService } from '~/client/services/date/js/js.date.service';

describe('Date service', () => {
	describe('formatToFRLongDate', () => {
		it('retourne la date sous format "jour mois (en lettre abrégée) année"', () => {
			// GIVEN
			const dateService = new JsDateService();

			// WHEN
			const formattedDate = dateService.formatToFRLongDate('2023-07-25T09:37:44.283Z');

			// THEN
			expect(formattedDate).toBe('25 juillet 2023');
		});
	});

	describe('today', () => {
		it('retourne la date du jour', () => {
			// GIVEN
			const dateService = new JsDateService();
			const expectedToday = new Date();

			// WHEN
			const today = dateService.today();

			// THEN
			expect(today.getDay()).toBe(expectedToday.getDay());
			expect(today.getMonth()).toBe(expectedToday.getMonth());
			expect(today.getFullYear()).toBe(expectedToday.getFullYear());
		});
	});
});
