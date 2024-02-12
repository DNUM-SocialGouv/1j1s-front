import { telFrRegex } from '~/shared/telRegex';

describe('Tel FR regex', () => {
	it.each([
		'0601020304',
		'0101020304',
		'0033101020304',
		'+33101020304',
	])('%s est un numéro de telephone valide', (validTel) => {
		// WHEN
		const isMatching = new RegExp(telFrRegex).test(validTel);

		// THEN
		expect(isMatching).toBe(true);
	});

	it.each([
		'0601020304050601020304',
		'060102nope0304',
		'+44611111111',
		'6611111111',
		'0044111111',
	])('%s est un numéro de telephone invalide', (invalidTel) => {
		// WHEN
		const isMatching = new RegExp(telFrRegex).test(invalidTel);

		// THEN
		expect(isMatching).toBe(false);
	});
});
