/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

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
});
