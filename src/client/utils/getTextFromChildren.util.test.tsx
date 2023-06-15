import { getTextFromChildren } from './getTextFromChildren.util';

describe('getTextFromChildren', () => {
	it('retourne le texte d’un string', () => {
		// Given
		const node = 'Hello world';

		// When
		const result = getTextFromChildren(node);

		// Then
		expect(result).toBe('Hello world');
	});

	it('retourne le texte d’un nombre', () => {
		// Given
		const node = 42;

		// When
		const result = getTextFromChildren(node);

		// Then
		expect(result).toBe('42');
	});

	it('retourne le texte de plusieurs node react', () => {
		// Given
		const node = (
			<div>
				Hello
				<span>
					world
				</span>
				!
			</div>
		);

		// When
		const result = getTextFromChildren(node);

		// Then
		expect(result).toBe('Hello world !');
	});
	it('retourne le texte avec une div et span', () => {
		// Given
		const node = (
			<div>
				Télécharger sur<br/>
				<span>APP Store</span>
			</div>
		);

		// When
		const result = getTextFromChildren(node);

		// Then
		expect(result).toBe('Télécharger sur APP Store');
	});
});
