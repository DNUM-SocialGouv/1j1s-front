/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { Link } from '~/client/components/ui/Link/Link';

describe('Link', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'location', {
			value: { origin: 'https://localhost:3000' },
		});
	});
	
	describe('quand le lien est un lien externe', () => {
		it('retourne un *tag a* avec les propriétés target et rel', () => {
			const lienExterne = 'https://mon-lien-externe';

			render(
				<Link href={lienExterne} />,
			);

			const linkComponent = screen.getByRole('link');

			expect(linkComponent.getAttribute('href')).toEqual('https://mon-lien-externe');
			expect(linkComponent).toHaveAttribute('target');
			expect(linkComponent).toHaveAttribute('rel');
		});
		it('l‘icone par défaut possède un nom accessible pour indiquer qu‘il s‘agit d‘une redirection externe', () => {
			const lienExterne = 'https://mon-lien-externe';

			render(
				<Link href={lienExterne}>
					Mon super lien externe
					<Link.Icon/>
				</Link>,
			);

			const linkComponent = screen.getByRole('link');

			expect(linkComponent).toHaveAccessibleName('Mon super lien externe - nouvelle fenêtre');
		});
	});
	describe('quand le lien est un lien interne', () => {
		it('avec href relatif, retourne le composant Link sans les propriétés de la redirection externe', () => {
			const lienInterne = '/emplois';

			render(
				<Link href={lienInterne} />,
			);

			const linkComponent = screen.getByRole('link');

			expect(linkComponent.getAttribute('href')).toEqual('/emplois');
			expect(linkComponent).not.toHaveAttribute('target');
			expect(linkComponent).not.toHaveAttribute('rel');
		});

		it('avec href absolu, retourne le composant Link sans les propriétés de la redirection externe', () => {
			const lienInterne = 'https://localhost:3000/emplois';

			render(
				<Link href={lienInterne} />,
			);

			const linkComponent = screen.getByRole('link');

			expect(linkComponent.getAttribute('href')).toEqual('https://localhost:3000/emplois');
			expect(linkComponent).not.toHaveAttribute('target');
			expect(linkComponent).not.toHaveAttribute('rel');
		});

		it('avec une ancre, retourne le composant Link sans les propriétés de la redirection externe', () => {
			const lienInterne = '#emplois';

			render(
				<Link href={lienInterne} />,
			);

			const linkComponent = screen.getByRole('link');

			expect(linkComponent.getAttribute('href')).toEqual('#emplois');
			expect(linkComponent).not.toHaveAttribute('target');
			expect(linkComponent).not.toHaveAttribute('rel');
		});
	});
});
