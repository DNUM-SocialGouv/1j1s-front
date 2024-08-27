/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BaseSyntheticEvent, useState } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

describe('ModalComponent', () => {
	it('à l’ouverture, le focus est donné au bouton de fermeture qui est le premier élément interactif', () => {
		render(<ModalComponent
			aria-label="label"
			isOpen={true}
			closeLabel={'Fermer'}
			close={() => {
			}}
		>
			<ModalComponent.Title>
				Ceci est le titre de la modale
			</ModalComponent.Title>
			<ModalComponent.Content>
				Ceci est le contenu de la modale
			</ModalComponent.Content>
		</ModalComponent>);

		const boutonFermer = screen.getByRole('button', { name: 'Fermer' });
		expect(boutonFermer).toHaveFocus();
	});

	it('lorsque je ferme la modale, le focus revient sur l‘élément qui avait le focus avant l‘ouverture', async () => {
		const user = userEvent.setup();

		function ButtonWithModale() {
			const [isModaleOpen, setIsModaleOpen] = useState<boolean>(false);
			return <>
				<button onClick={() => setIsModaleOpen(true)}>Ouvrir la modale</button>
				<ModalComponent
					aria-label="label"
					isOpen={isModaleOpen}
					closeLabel={'Fermer'}
					close={() => setIsModaleOpen(false)}
				>
					<ModalComponent.Content>Ceci est le contenu de la modale</ModalComponent.Content>
				</ModalComponent>
			</>;
		}

		render(<ButtonWithModale/>);

		await user.click(screen.getByRole('button', { name: 'Ouvrir la modale' }));
		expect(screen.getByRole('button', { name: 'Fermer' })).toHaveFocus();

		await user.click(screen.getByRole('button', { name: 'Fermer' }));

		expect(screen.getByRole('button', { name: 'Ouvrir la modale' })).toHaveFocus();
	});

	it('ferme la modale quand on appuie sur Échap', async () => {
		const user = userEvent.setup();
		const onClose = jest.fn();
		render(
			<ModalComponent aria-label="label" isOpen={true} close={onClose}>
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
			<ModalComponent aria-label="label" isOpen={true} close={onClose} onKeyDown={onKeyDown}>
				<ModalComponent.Title>Ceci est le titre de la modale</ModalComponent.Title>
				<ModalComponent.Content>Ceci est le contenu de la modale</ModalComponent.Content>
			</ModalComponent>,
		);

		await user.keyboard(`{${KeyBoard.ESCAPE}}`);

		expect(onClose).not.toHaveBeenCalled();
	});
});
