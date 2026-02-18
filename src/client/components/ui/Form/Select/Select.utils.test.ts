import { isSearchableCharacter } from '~/client/components/ui/Form/Select/Select.utils';

describe('isSearchableCharacter', () => {
	it('renvoie true si c’est un caractère', () => {
		const event = new KeyboardEvent('', { key: 'a' });

		const searchable = isSearchableCharacter(event);

		expect(searchable).toBe(true);
	});
	it('renvoie false si ce n’est pas un caractère', () => {
		const event = new KeyboardEvent('', { key: 'CapsLock' });

		const searchable = isSearchableCharacter(event);

		expect(searchable).toBe(false);
	});
	it('renvoie false si c’est la touche espace', () => {
		const event = new KeyboardEvent('', { key: ' ' });

		const searchable = isSearchableCharacter(event);

		expect(searchable).toBe(false);
	});
	it.each([
		'metaKey',
		'altKey',
		'ctrlKey',
	])('renvoie false si c’est une raccourci avec %s', (modifier) => {
		const event = new KeyboardEvent('', {
			key: 'a',
			[modifier]: true,
		});

		const searchable = isSearchableCharacter(event);

		expect(searchable).toBe(false);
	});
});
