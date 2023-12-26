import { emailRegex } from '~/shared/emailRegex';

describe('E-mail regex', () => {
	it.each([
		'email@example.com',
		'firstname.lastname@example.com',
		'email@subdomain.example.com',
		'firstname+lastname@example.com',
		'1234567890@example.com',
		'email@example-one.com',
		'_______@example.com',
		'email@example.name',
		'email@example.museum',
		'email@example.co.jp',
		'firstname-lastname@example.com',
	])('%s est une adresse e-mail valide', (validEmail) => {
		// WHEN
		const isMatching = new RegExp(emailRegex).test(validEmail);

		// THEN
		expect(isMatching).toBe(true);
	});

	it.each([
		'example@gmail.com@gmail.com',
		'jean@gmailcom',
		'plainaddress',
		'#@%^%#$@#$@#.com',
		'@example.com',
		'Joe Smith <email@example.com>',
		'email.example.com',
		'email@example@example.com',
		'.email@example.com',
		'email.@example.com',
		'email..email@example.com',
		'あいうえお@example.com',
		'email@example.com (Joe Smith)',
		'email@example',
		'email@-example.com',
		'email@example..com',
		'Abc..123@example.com',
	])('%s est invalide', (invalidEmail) => {
		// WHEN
		const isMatching = new RegExp(emailRegex).test(invalidEmail);

		// THEN
		expect(isMatching).toBe(false);
	});
});
