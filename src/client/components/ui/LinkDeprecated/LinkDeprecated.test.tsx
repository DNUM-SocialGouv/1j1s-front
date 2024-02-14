/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { LinkDeprecated } from '~/client/components/ui/LinkDeprecated/LinkDeprecated';

describe('Link', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('quand le lien est un lien externe', () => {
		it('retourne le composant Link avec un *tag a* directement et les propriétés target et rel', () => {
			const lienExterne = 'https://mon-lien-externe';

			render(
				<LinkDeprecated href={lienExterne} />,
			);

			const linkComponent = screen.getByRole('link');

			expect(linkComponent.getAttribute('href')).toEqual('https://mon-lien-externe');
			expect(linkComponent).toHaveAttribute('target');
			expect(linkComponent).toHaveAttribute('rel');
		});
	});

	describe('quand le lien est un lien interne avec href relatif', () => {
		it('retourne le composant Link sans les propriétés de la redirection externe', () => {
			const lienInterne = '/emplois';

			render(
				<LinkDeprecated href={lienInterne} />,
			);

			const linkComponent = screen.getByRole('link');

			expect(linkComponent.getAttribute('href')).toEqual('/emplois');
			expect(linkComponent).not.toHaveAttribute('target');
			expect(linkComponent).not.toHaveAttribute('rel');
		});
	});
	describe('quand le lien est un lien interne avec href absolut', () => {
		it('retourne le composant Link sans les propriétés de la redirection externe', () => {
			Object.defineProperty(window, 'location', {
				value: { origin: 'localhost' },
			});
			const lienInterne = 'localhost/emplois';

			render(
				<LinkDeprecated href={lienInterne} />,
			);

			const linkComponent = screen.getByRole('link');

			expect(linkComponent.getAttribute('href')).toEqual('localhost/emplois');
			expect(linkComponent).not.toHaveAttribute('target');
			expect(linkComponent).not.toHaveAttribute('rel');
		});
	});
	describe('quand le lien est un lien interne vers une ancre', () => {
		it('retourne le composant Link sans les propriétés de la redirection externe', () => {
			const lienInterne = '#emplois';

			render(
				<LinkDeprecated href={lienInterne} />,
			);

			const linkComponent = screen.getByRole('link');

			expect(linkComponent.getAttribute('href')).toEqual('#emplois');
			expect(linkComponent).not.toHaveAttribute('target');
			expect(linkComponent).not.toHaveAttribute('rel');
		});
	});
});
