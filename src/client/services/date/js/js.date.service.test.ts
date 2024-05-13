import { JsDateService } from '~/client/services/date/js/js.date.service';

describe('Date service', () => {
	describe('formatToHumanReadableDate', () => {
		it('retourne la date sous format "jour mois (en lettre abrégée) année', () => {
			// GIVEN
			const dateService = new JsDateService();
			const date = new Date('2024-09-01');

			// WHEN
			const formattedDate = dateService.formatToHumanReadableDate(date);

			// THEN
			expect(formattedDate).toBe('1 septembre 2024');
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
