import { DateStageFormatted } from '~/client/components/features/OffreDeStage/dateStageFormatted';

describe('getDateStageFormatted', () => {
	it('lorsque la date de debut max n‘est pas donnée, renvoie l‘information sur la date de début min', () => {
		const result = DateStageFormatted('2024-09-01', undefined);
		expect(result).toBe('Débute le 1 septembre 2024');
	});

	it('lorsque la date de debut max est la égale à la date de début min, renvoie l‘information sur la date de début min', () => {
		const result = DateStageFormatted('2024-09-01', '2024-09-01');
		expect(result).toBe('Débute le 1 septembre 2024');
	});

	it('lorsque la date de debut max existe et est différente de la date de début min, renvoie l‘information sur la date de début min et la date de début max', () => {
		const result = DateStageFormatted('2024-09-01', '2024-10-01');
		expect(result).toBe('Débute entre le 1 septembre 2024 et le 1 octobre 2024');
	});
});
