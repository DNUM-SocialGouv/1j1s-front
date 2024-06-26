/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { Link } from '~/client/components/ui/Link/Link';

import styles from './Link.module.scss';

const boutonsAppearances = {
	asPrimaryButton: styles.primary,
	asQuaternaryButton: styles.quaternary,
	asSecondaryButton: styles.secondary,
	asTertiaryButton: styles.tertiary,
};

describe('Link', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'location', {
			value: { origin: 'https://localhost:3000' },
		});
	});
	
	describe('apparence des liens', () => {
		Object.entries(boutonsAppearances).forEach(([appearance, expectedClass]) => {
			it(`doit appliquer la classe ${expectedClass} pour l'apparence ${appearance}`, () => {
				const lienExterne = 'https://mon-lien-externe';

				render(<Link href={lienExterne} appearance={appearance as keyof typeof undefined} />);
				
				const linkComponent = screen.getByRole('link');
	
				expect(linkComponent).toHaveClass(expectedClass);
			});
		});
	});

	describe('quand le lien est un lien externe', () => {
		it('doit retourner un élément <a> avec les propriétés target et rel', () => {
			const lienExterne = 'https://mon-lien-externe';

			render(<Link href={lienExterne} />);

			const linkComponent = screen.getByRole('link');

			expect(linkComponent).toHaveAttribute('href', lienExterne);
			expect(linkComponent).toHaveAttribute('target', '_blank');
			expect(linkComponent).toHaveAttribute('rel', 'noreferrer');
		});

		it('doit avoir une icone par défaut qui possède un nom accessible pour indiquer qu‘il s‘agit d‘une redirection externe', () => {
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
		it('doit rendre un composant Link sans attributs de redirection externe pour un lien relatif', () => {
			const lienInterne = '/emplois';

			render(
				<Link href={lienInterne} />,
			);

			const linkComponent = screen.getByRole('link');

			expect(linkComponent.getAttribute('href')).toEqual(lienInterne);
			expect(linkComponent).not.toHaveAttribute('target');
			expect(linkComponent).not.toHaveAttribute('rel');
		});

		it('doit rendre un composant Link sans attributs de redirection externe pour un lien absolu', () => {
			const lienInterne = 'https://localhost:3000/emplois';

			render(
				<Link href={lienInterne} />,
			);

			const linkComponent = screen.getByRole('link');

			expect(linkComponent.getAttribute('href')).toEqual(lienInterne);
			expect(linkComponent).not.toHaveAttribute('target');
			expect(linkComponent).not.toHaveAttribute('rel');
		});
			
		describe('lorsque c‘est une ancre', () => {
			let MockLinkNext: jest.Mock;

			jest.mock('next/link', () => {
				return jest.fn(({ children, ...props }) => {
					return <a {...props}>{children}</a>;
				});
			});

			beforeEach(() => {
				MockLinkNext = require('next/link');
				MockLinkNext.mockClear();
			});
			
			it('doit rendre un élément <a> sans utiliser LinkNext', () => {
				const monAncre = '#section1';

				render(<Link href={monAncre} />);
	
				const linkComponent = screen.getByRole('link');

				expect(linkComponent.tagName).toBe('A');
				expect(MockLinkNext).not.toHaveBeenCalled();
			});
		});
	});
});
