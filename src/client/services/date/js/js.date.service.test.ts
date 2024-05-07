import { JsDateService } from '~/client/services/date/js/js.date.service';

describe('Date service', () => {
	describe('formatToHumanReadableDate', () => {
		it('lorsque la date est de type Date, retourne la date sous format "jour mois (en lettre abrégée) année', () => {
			// GIVEN
			const dateService = new JsDateService();

			// WHEN
			const formattedDate = dateService.formatToHumanReadableDate(new Date('2024-09-01'));

			// THEN
			expect(formattedDate).toBe('1 septembre 2024');
		});

		it('lorsque la date est de type string, retourne la date sous format "jour mois (en lettre abrégée) année"', () => {
			// GIVEN
			const dateService = new JsDateService();

			// WHEN
			const formattedDate = dateService.formatToHumanReadableDate('2023-07-25T09:37:44.283Z');

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
