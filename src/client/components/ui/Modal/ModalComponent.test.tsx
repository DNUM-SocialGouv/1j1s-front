/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BaseSyntheticEvent } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

describe('ModalComponent', () => {
	it('à l’ouverture, le focus est donné au bouton de fermeture qui est le premier élément interactif', () => {
		// GIVEN

		// WHEN
		render(<ModalComponent
			isOpen={true}
			closeLabel={'Fermer'}
			close={() => {}}
		>
			<ModalComponent.Title>
				Ceci est le titre de la modale
			</ModalComponent.Title>
			<ModalComponent.Content>
				Ceci est le contenu de la modale
			</ModalComponent.Content>
		</ModalComponent>);

		// THEN
		const boutonFermer = screen.getByRole('button', { name: 'Fermer' });
		expect(boutonFermer).toHaveFocus();
	});

	it('ferme la modale quand on appuie sur Échap', async () => {
		const user = userEvent.setup();
		const onClose = jest.fn();
		render(
			<ModalComponent isOpen={true} close={onClose}>
				<ModalComponent.Title>Ceci est le titre de la modale</ModalComponent.Title>
				<ModalComponent.Content>Ceci est le contenu de la modale</ModalComponent.Content>
			</ModalComponent>,
		);

		await user.keyboard(`{${KeyBoard.ESCAPE}}`);

		expect(onClose).toHaveBeenCalled();
	});
	it('ne ferme pas la modale quand on appuie sur Échap, mais que le default est prevented', async () => {
		const user = userEvent.setup();
		const onClose = jest.fn();
		const onKeyDown = (event: BaseSyntheticEvent) => {
			event.preventDefault();
		};
		render(
			<ModalComponent isOpen={true} close={onClose} onKeyDown={onKeyDown}>
				<ModalComponent.Title>Ceci est le titre de la modale</ModalComponent.Title>
				<ModalComponent.Content>Ceci est le contenu de la modale</ModalComponent.Content>
			</ModalComponent>,
		);

		await user.keyboard(`{${KeyBoard.ESCAPE}}`);

		expect(onClose).not.toHaveBeenCalled();
	});
});
