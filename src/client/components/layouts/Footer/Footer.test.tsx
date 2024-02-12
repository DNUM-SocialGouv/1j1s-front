/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Footer from '~/client/components/layouts/Footer/Footer';

describe('Footer', () => {
	it('renders Footer component', () => {
		render(<Footer />);

		const footer = screen.getByRole('contentinfo');

		expect(footer).toBeVisible();
	});

	it('rends le composant avec le logo du ministère du travail', () => {
		render(<Footer />);


		const logo1 = screen.getByText('Ministère');
		const logo2 = screen.getByText('du travail');
		const logo3 = screen.getByText('de la santé');
		const logo4 = screen.getByText('et des solidarités');

		expect(logo1).toBeVisible();
		expect(logo2).toBeVisible();
		expect(logo3).toBeVisible();
		expect(logo4).toBeVisible();
	});

	it('renders Footer component with a link to legifrance.gouv.fr', () => {
		// When
		render(<Footer />);

		// Then
		const link = screen.getByRole('link', { name: 'legifrance.gouv.fr' });

		expect(link).toBeVisible();
		expect(link).toHaveAttribute('href', 'https://www.legifrance.gouv.fr/');
		expect(link).toHaveAttribute('title', 'legifrance.gouv.fr - nouvelle fenêtre');
	});

	it('renders Footer component with a link to gouvernement.fr', () => {
		// When
		render(<Footer />);

		// Then
		const link = screen.getByRole('link', { name: 'gouvernement.fr' });

		expect(link).toBeVisible();
		expect(link).toHaveAttribute('href', 'https://www.gouvernement.fr/');
		expect(link).toHaveAttribute('title', 'gouvernement.fr - nouvelle fenêtre');
	});

	it('renders Footer component with a link to service-public.fr', () => {
		// When
		render(<Footer />);

		// Then
		const link = screen.getByRole('link', { name: 'service-public.fr' });

		expect(link).toBeVisible();
		expect(link).toHaveAttribute('href', 'https://www.service-public.fr/');
		expect(link).toHaveAttribute('title', 'service-public.fr - nouvelle fenêtre');
	});

	it('renders Footer component with a link to data.gouv.fr', () => {
		// When
		render(<Footer />);

		// Then
		const link = screen.getByRole('link', { name: 'data.gouv.fr' });

		expect(link).toBeVisible();
		expect(link).toHaveAttribute('href', 'https://www.data.gouv.fr/');
		expect(link).toHaveAttribute('title', 'data.gouv.fr - nouvelle fenêtre');
	});

	it('renders Footer component with a link to france.fr', () => {
		// When
		render(<Footer />);

		// Then
		const link = screen.getByRole('link', { name: 'france.fr' });

		expect(link).toBeVisible();
		expect(link).toHaveAttribute('href', 'https://www.france.fr/');
		expect(link).toHaveAttribute('title', 'france.fr - nouvelle fenêtre');
	});

	it('renders Footer component with a link to etalab.gouv.fr', () => {
		// When
		render(<Footer />);

		// Then
		const link = screen.getByRole('link', { name: 'etalab-2.0' });

		expect(link).toBeVisible();
		expect(link).toHaveAttribute('href', 'https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf');
		expect(link).toHaveAttribute('title', 'etalab-2.0 - nouvelle fenêtre');
	});
});
