/**
 * @jest-environment jsdom
 */

import {
	render,
	screen,
} from '@testing-library/react';

import { LinkCard } from '~/client/components/ui/Card/Link/LinkCard';

describe('LinkCard', () => {
	const defaultProps = {
		imageUrl: 'https://example.com/image.jpg',
		link: 'https://example.com',
		linkLabel: 'En savoir plus',
		title: 'Titre de test',
	};

	it('affiche une carte lien avec tous les éléments', () => {
		render(<LinkCard {...defaultProps} />);

		expect(screen.getByRole('heading', { name: defaultProps.title })).toBeVisible();
		expect(screen.getByRole('link')).toHaveAttribute('href', defaultProps.link);
		expect(screen.getByText(defaultProps.linkLabel)).toBeVisible();
		expect(screen.getByText(defaultProps.linkLabel)).toHaveClass('sr-only');
		expect(screen.getByRole('presentation')).toHaveAttribute('alt', '');
	});
});
