/**
 * @jest-environment jsdom
 */


import { render, screen } from '@testing-library/react';

import { NavItem } from '~/client/components/layouts/Header/Navigation/NavItem/NavItem';

describe('NavItem', () => {
	it('affiche un lien avec le bon label', () => {
		render(<NavItem link="/test" isActive label={'je suis le label'} />);

		expect(screen.getByRole('link', { name: 'je suis le label' })).toBeVisible();
	});

	it('affiche le lien est actif, la propriété aria-current est a true', () => {
		render(<NavItem link="/test" isActive label={'je suis le label'} />);

		expect(screen.getByRole('link', { name: 'je suis le label' })).toHaveAttribute('aria-current', 'true');
	});

	it('lorsque le lien est une redirection externe, ajoute l‘information au label', () => {
		render(<NavItem link="https://test.com" isActive label={'je suis le label'} />);

		expect(screen.getByRole('link', { name: 'je suis le label - nouvelle fenêtre' })).toBeVisible();
	});
});
