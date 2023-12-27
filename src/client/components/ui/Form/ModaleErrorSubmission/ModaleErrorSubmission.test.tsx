/**
 * @jest-environment jsdom
 */


import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { ModaleErrorSubmission } from '~/client/components/ui/Form/ModaleErrorSubmission/ModaleErrorSubmission';

describe('<ModaleErrorSubmission/>', () => {
	it('affiche le composant quand la propriété d‘ouverture est true', () => {
		render(<ModaleErrorSubmission isOpen={true} onClose={jest.fn()}/>);
		
		expect(screen.getByRole('dialog')).toBeVisible();
		expect(screen.getByRole('heading', { level: 1, name: 'Une erreur est survenue lors de l‘envoi du formulaire' })).toBeVisible();
	});

	it('n‘affiche pas le composant quand la propriété d‘ouverture est à false', () => {
		render(<ModaleErrorSubmission isOpen={false} onClose={jest.fn()}/>);

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('affiche le lien de redirection vers la page d‘accueil', () => {
		render(<ModaleErrorSubmission isOpen={true} onClose={jest.fn()}/>);
		const lien = screen.getByRole('link', { name: 'Aller à l‘accueil' });

		expect(lien).toBeVisible();
		expect(lien).toHaveAttribute('href', '/');
	});
	
	it('affiche le bouton de retour au formulaire', async () => {
		const user = userEvent.setup();
		const onClose = jest.fn();
		render(<ModaleErrorSubmission isOpen={true} onClose={onClose}/>);

		const bouton = screen.getByRole('button', { name: 'Retour au formulaire' });
		expect(bouton).toBeVisible();
		
		await user.click(bouton);
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('Lorsqu‘une description est présente, elle s‘affiche',  () => {
		const onClose = jest.fn();
		render(<ModaleErrorSubmission isOpen={true} onClose={onClose} description={'je suis la description'}/>);

		expect(screen.getByText('je suis la description')).toBeVisible();
	});
});
