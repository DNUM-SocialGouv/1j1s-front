/**
 * @jest-environment jsdom
 */


import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { ModalErrorSubmission } from '~/client/components/ui/Form/ModaleErrorSubmission/ModalErrorSubmission';

describe('<ModalErrorSubmission/>', () => {
	it('affiche la modale quand la propriété d‘ouverture est true', () => {
		render(<ModalErrorSubmission isOpen={true} onClose={jest.fn()} onBackToForm={jest.fn()}/>);
		
		expect(screen.getByRole('dialog')).toBeVisible();
		expect(screen.getByRole('heading', { level: 1, name: 'Une erreur est survenue lors de l‘envoi du formulaire' })).toBeVisible();
	});

	it('n‘affiche pas la modale quand la propriété d‘ouverture est à false', () => {
		render(<ModalErrorSubmission isOpen={false} onClose={jest.fn()} onBackToForm={jest.fn()}/>);

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('affiche le lien de redirection vers la page d‘accueil', () => {
		render(<ModalErrorSubmission isOpen={true} onClose={jest.fn()} onBackToForm={jest.fn()}/>);
		const lien = screen.getByRole('link', { name: 'Aller à l‘accueil' });

		expect(lien).toBeVisible();
		expect(lien).toHaveAttribute('href', '/');
	});
	
	it('affiche le bouton de retour au formulaire et appelle onBackToForm lorsque le bouton est cliqué', async () => {
		const user = userEvent.setup();
		const onBackToForm = jest.fn();
		render(<ModalErrorSubmission isOpen={true} onClose={jest.fn()} onBackToForm={onBackToForm}/>);

		const bouton = screen.getByRole('button', { name: 'Retour au formulaire' });
		expect(bouton).toBeVisible();
		
		await user.click(bouton);
		expect(onBackToForm).toHaveBeenCalledTimes(1);
	});

	it('appelle la propriété onClose lorsque la modale d‘erreur est fermée', async () => {
		const user = userEvent.setup();
		const onClose = jest.fn();
		render(<ModalErrorSubmission isOpen={true} onClose={onClose} onBackToForm={jest.fn()}/>);

		const bouton = screen.getByRole('button', { name: 'Fermer' });
		expect(bouton).toBeVisible();

		await user.click(bouton);
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('Lorsqu‘une description est présente, elle s‘affiche',  () => {
		const onClose = jest.fn();
		render(<ModalErrorSubmission isOpen={true} onClose={onClose} description={'je suis la description'} onBackToForm={jest.fn()}/>);

		expect(screen.getByText('je suis la description')).toBeVisible();
	});
});
