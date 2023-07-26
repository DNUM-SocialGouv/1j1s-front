import { formatToFRLongDate } from '~/client/utils/formatDate.util';

describe('formatDate', () => {
	describe('formatToFRLongDate', () => {
		it('retourne la date sous format "jour mois (en lettre abrégée) année"', () => {
			// WHEN
			const formattedDate = formatToFRLongDate('2023-07-25T09:37:44.283Z');

			// THEN
			expect(formattedDate).toBe('25 juillet 2023');
		});
	});
});
