import { urlRegex } from '~/shared/urlRegex';

describe('URL regex', () => {
	it.each([
		'http://example.com',
		'https://example.com/ea1.8|()@:%_+.~#?&=/',
		'http://www.example.com?extension',
		'http://www.example.com+extension',
		'http://www.example.com.extension',
		'http://www.examplesansextension',
		'http://www.example-avec-tiret.com', // ????
		'www.example.com', // ????
		'example.com', // ????
	])('%s est une url valide', (validUrl) => {
		// WHEN
		const isMatching = new RegExp(urlRegex).test(validUrl);

		// THEN
		expect(isMatching).toBe(true);
	});

	it.each([
		'http://www.example.com rrr',
		'pasuneurl',
		'https:google.com',
		'https:google.com',
	])('%s est une url invalide', (invalidTel) => {
		// WHEN
		const isMatching = new RegExp(urlRegex).test(invalidTel);

		// THEN
		expect(isMatching).toBe(false);
	});
});
