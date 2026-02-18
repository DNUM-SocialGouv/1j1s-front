import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { KeyBoard } from '~/client/components/keyboard.fixture';
import { TipDisclosure } from '~/client/components/ui/TipDisclosure/TipDisclosure';

describe('TipDisclosure', () => {
	it.each([KeyBoard.ENTER, KeyBoard.SPACE])
	('avec la touche Enter et Space, il est possible d’ouvrir et fermer l’infobulle', async (touche: KeyBoard) => {
		// Given
		const user = userEvent.setup();
		const ariaLabel = 'buttonLabel';
		render(
			<TipDisclosure disclosureAriaLabel={ariaLabel} tipId='test'>ceci est un texte informatif</TipDisclosure>,
		);
		await user.tab();

		// When
		const boutonDisclosure = screen.getByRole('button', { name: 'buttonLabel (Ouvrir)' });
		expect(boutonDisclosure).toHaveFocus();
		await user.keyboard(touche);

		// Then
		const information = screen.getByText('ceci est un texte informatif');

		expect(information).toBeVisible();
		expect(boutonDisclosure).toHaveAttribute('aria-expanded', 'true');
		expect(boutonDisclosure).toHaveAttribute('aria-controls', 'test');
		expect(boutonDisclosure).toHaveAccessibleName('buttonLabel (Fermer)');


		// When
		await user.keyboard(touche);

		//Then
		expect(information).not.toBeVisible();
		expect(boutonDisclosure).toHaveAttribute('aria-expanded', 'false');
		expect(boutonDisclosure).not.toHaveAttribute('aria-controls');
	});
	it('au clic de la souris sur le bouton disclosure, il est possible d’ouvrir et fermer l’infobulle', async () => {
		// Given
		const user = userEvent.setup();
		const ariaLabel = 'buttonLabel';
		render(
			<TipDisclosure disclosureAriaLabel={ariaLabel} tipId='test'>ceci est un texte informatif</TipDisclosure>,
		);

		// When
		const boutonDisclosure = screen.getByRole('button', { name: 'buttonLabel (Ouvrir)' });
		await user.click(boutonDisclosure);

		// Then
		const information = screen.getByText('ceci est un texte informatif');

		expect(information).toBeVisible();
		expect(boutonDisclosure).toHaveAttribute('aria-expanded', 'true');
		expect(boutonDisclosure).toHaveAttribute('aria-controls', 'test');
		expect(boutonDisclosure).toHaveAccessibleName('buttonLabel (Fermer)');


		// When
		await user.click(boutonDisclosure);

		//Then
		expect(information).not.toBeVisible();
		expect(boutonDisclosure).toHaveAttribute('aria-expanded', 'false');
		expect(boutonDisclosure).not.toHaveAttribute('aria-controls');
	});
	describe('quand l’infobulle est ouverte', () => {
		describe('le bouton de fermeture de l’infobulle', () => {
			it('lorsque l’utilisateur clique sur le bouton de fermeture présent dans l’infobulle, l’infobulle se ferme', async () => {
				// Given
				const user = userEvent.setup();
				const ariaLabel = 'buttonLabel';
				render(
					<TipDisclosure disclosureAriaLabel={ariaLabel} tipId='test'>ceci est un texte informatif</TipDisclosure>,
				);
				const boutonDisclosure = screen.getByRole('button', { name: 'buttonLabel (Ouvrir)' });
				await user.click(boutonDisclosure);

				// When
				const boutonFermer = screen.getByRole('button', { name: 'fermer' });
				await user.click(boutonFermer);

				// Then
				const information = screen.getByText('ceci est un texte informatif');
				expect(information).not.toBeVisible();
			});
			it.each([KeyBoard.ENTER, KeyBoard.SPACE])
			('avec la touche Enter et Space, il est possible de fermer l’infobulle', async (touche: KeyBoard) => {
				// Given
				const user = userEvent.setup();
				const ariaLabel = 'buttonLabel';
				render(
					<TipDisclosure disclosureAriaLabel={ariaLabel} tipId='test'>ceci est un texte informatif</TipDisclosure>,
				);
				const boutonDisclosure = screen.getByRole('button', { name: 'buttonLabel (Ouvrir)' });
				await user.click(boutonDisclosure);
				await user.tab();

				// When
				const boutonFermer = screen.getByRole('button', { name: 'fermer' });
				expect(boutonFermer).toHaveFocus();
				await user.keyboard(touche);

				// Then
				const information = screen.getByText('ceci est un texte informatif');
				expect(information).not.toBeVisible();
			});
		});
	});
});
