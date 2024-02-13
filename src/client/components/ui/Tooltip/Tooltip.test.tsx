/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { KeyBoard } from '~/client/components/keyboard.fixture';
import { Tooltip } from '~/client/components/ui/Tooltip/Tooltip';

describe('Tooltip', () => {
	it('affiche l’infobulle au survol', async() => {
		const ariaLabel = 'buttonLabel';
		const user = userEvent.setup();
		render(
			<Tooltip icon="information" ariaLabel={ariaLabel} tooltipId='tooltip-id'>ceci est un texte informatif</Tooltip>,
		);
		const bulleInformative = screen.getByRole('button', { name: ariaLabel });
		await user.hover(bulleInformative);
		const information = screen.getByText('ceci est un texte informatif');

		expect(information).toBeVisible();
		expect(bulleInformative).toHaveAttribute('aria-expanded', 'true');
		expect(bulleInformative).toHaveAttribute('aria-controls', 'tooltip-id');
	});

	it('affiche l’infobulle à la navigation au clavier', async ()=> {
		const user = userEvent.setup();
		const ariaLabel = 'buttonLabel';
		render(
			<Tooltip icon="information" ariaLabel={ariaLabel} tooltipId='tooltip-id'>ceci est un texte informatif</Tooltip>,
		);

		await user.tab();
		const information = screen.getByText('ceci est un texte informatif');
		const bulleInformative = screen.getByRole('button', { name: ariaLabel });

		expect(information).toBeVisible();
		expect(bulleInformative).toHaveAttribute('aria-expanded', 'true');
		expect(bulleInformative).toHaveAttribute('aria-controls', 'tooltip-id');

	});

	it('ferme l’infobulle à la navigation au clavier', async ()=> {
		const user = userEvent.setup();
		const ariaLabel = 'buttonLabel';
		render(
			<Tooltip icon="information" ariaLabel={ariaLabel} tooltipId='test'>ceci est un texte informatif</Tooltip>,
		);
		await user.tab();
		const information = screen.getByText('ceci est un texte informatif');
		expect(information).toBeVisible();

		await user.tab();

		const boutonFermeture = screen.getByRole('button', { name: 'fermer' });
		expect(boutonFermeture).toHaveFocus();
		await user.keyboard(KeyBoard.ENTER);
		expect(information).not.toBeVisible();

		const bulleInformative = screen.getByRole('button', { name: ariaLabel });
		expect(bulleInformative).toHaveAttribute('aria-expanded', 'false');
		expect(bulleInformative).not.toHaveAttribute('aria-controls');
	});
});
