/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import {
	LinkStyledAsButton,
	LinkStyledAsButtonWithIcon,
} from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

describe('LinkStyledAsButton', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('quand le lien est un lien externe', () => {
		it('retourne le composant Link avec les propriétés de redirection externe', () => {
			const lienExterne = 'https://mon-lien-externe';

			render(
				<LinkStyledAsButton href={lienExterne} appearance={'asPrimaryButton'}/>,
			);

			const linkComponent = screen.getByRole('link');

			expect(linkComponent).toHaveAttribute('href', 'https://mon-lien-externe');
			expect(linkComponent).toHaveAttribute('target');
			expect(linkComponent).toHaveAttribute('rel');
		});
	});

	describe('quand le lien est un lien interne avec href relatif', () => {
		it('retourne le composant Link sans les propriétés de la redirection externe', () => {
			const lienInterne = '/emplois';

			render(
				<LinkStyledAsButton href={lienInterne} appearance={'asPrimaryButton'}/>,
			);

			const linkComponent = screen.getByRole('link');

			expect(linkComponent).toHaveAttribute('href', '/emplois');
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
				<LinkStyledAsButton href={lienInterne} appearance={'asPrimaryButton'}/>,
			);

			const linkComponent = screen.getByRole('link');

			expect(linkComponent).toHaveAttribute('href', 'localhost/emplois');
			expect(linkComponent).not.toHaveAttribute('target');
			expect(linkComponent).not.toHaveAttribute('rel');
		});
	});

	describe('quand le lien est un lien interne vers une ancre', () => {
		it('retourne le composant Link sans les propriétés de la redirection externe', () => {
			const lienInterne = '#emplois';

			render(
				<LinkStyledAsButtonWithIcon
					href={lienInterne}
					appearance={'asPrimaryButton'}>
					ceci est un label
				</LinkStyledAsButtonWithIcon>,
			);

			expect(screen.getByText('ceci est un label')).toBeVisible();
		});
	});

	describe('quand l’attribut iconPosition est "none"', () => {
		it('retourne le composant sans icône', () => {
			render(
				<LinkStyledAsButton href={'/emplois'} appearance={'asPrimaryButton'} iconPosition={'none'}>nom du lien</LinkStyledAsButton>,
			);

			expect(screen.queryByRole('img')).not.toBeInTheDocument();
		});
	});
});
