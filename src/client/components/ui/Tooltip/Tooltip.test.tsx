/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tooltip } from '~/client/components/ui/Tooltip/Tooltip';
import { mockLargeScreen, mockSmallScreen } from '~/client/components/window.mock';

describe('Tooltip', () => {
	describe('Lorsque je suis un écran standard', () => {
		beforeEach(() => {
			mockLargeScreen();
		});

		it('monte le composant', () => {
			render(
				<Tooltip icon="information" ariaLabel="test" ariaDescribedBy='test'>test</Tooltip>,
			);
			const text = screen.getByText('test');

			expect(text).toBeInTheDocument();
		});

		it('affiche l’infobulle au survol', () => {
			const user = userEvent.setup();
			render(
				<Tooltip icon="information" ariaLabel="test" ariaDescribedBy='test'>test</Tooltip>,
			);
			const tooltip = screen.getByRole('tooltip');
			user.hover(tooltip);

			expect(tooltip).toBeVisible();
		});
		it('affiche l’infobulle à la navigation au clavier', ()=> {
			const user = userEvent.setup();
			render(
				<Tooltip icon="information" ariaLabel="test" ariaDescribedBy='test'>test</Tooltip>,
			);
			const tooltip = screen.getByRole('tooltip');
			user.tab();
			expect(tooltip).toBeVisible();
		});

	});
	describe('Lorsque je suis sur un petit écran', () => {
		beforeEach(() => {
			mockSmallScreen();
		});
		it('affiche l’infobulle au tap', async() => {
			const user = userEvent.setup();
			render(
				<Tooltip icon="information" ariaLabel="test" ariaDescribedBy='test'>ceci est un texte informatif</Tooltip>,
			);
			const icon = screen.getByRole('button');
			await user.click(icon);
			const information = screen.getByText('ceci est un texte informatif');

			expect(information).toBeVisible();
		});

		it('ferme l’infobulle au click sur la croix', async () => {
			const user = userEvent.setup();
			render(
				<Tooltip icon="information" ariaLabel="test" ariaDescribedBy='test'>test</Tooltip>,
			);
			const icon = screen.getByRole('button', { name:'test' });
			await user.click(icon);
			const croix = screen.getByRole('button', { name:'fermer' });

			expect(croix).toBeVisible();
			await user.click(croix);
			const text = screen.queryByText('test');
			expect(text).not.toBeInTheDocument();
		},
		);
	});

});
