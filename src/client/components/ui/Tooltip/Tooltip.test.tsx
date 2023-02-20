/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { KeyBoard } from '~/client/components/keyboard.fixture';
import { Tooltip } from '~/client/components/ui/Tooltip/Tooltip';

describe('Tooltip', () => {
	it('affiche l’infobulle au survol', async() => {
		const ariaLabel = 'buttonLabel';
		const user = userEvent.setup();
		render(
			<Tooltip icon="information" ariaLabel={ariaLabel} ariaDescribedBy='test'>ceci est un texte informatif</Tooltip>,
		);
		const bulleInformative = screen.getByRole('button', { name: ariaLabel });
		await user.hover(bulleInformative);
		const information = screen.getByText('ceci est un texte informatif');

		expect(information).toBeVisible();
	});

	it('affiche l’infobulle à la navigation au clavier', async ()=> {
		const user = userEvent.setup();
		const ariaLabel = 'buttonLabel';
		render(
			<Tooltip icon="information" ariaLabel={ariaLabel} ariaDescribedBy='test'>ceci est un texte informatif</Tooltip>,
		);
		await user.tab();
		const information = screen.getByText('ceci est un texte informatif');
		expect(information).toBeVisible();
	});

	it('ferme l’infobulle à la navigation au clavier', async ()=> {
		const user = userEvent.setup();
		const ariaLabel = 'buttonLabel';
		render(
			<Tooltip icon="information" ariaLabel={ariaLabel} ariaDescribedBy='test'>ceci est un texte informatif</Tooltip>,
		);
		await user.tab();
		const information = screen.getByText('ceci est un texte informatif');
		expect(information).toBeVisible();

		await user.tab();
		await user.keyboard(KeyBoard.ENTER);
		expect(information).not.toBeVisible();
	});
});
