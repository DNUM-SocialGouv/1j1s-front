/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import {
	RéseauÉconomieSocialeEtSolidaireList,
} from '~/client/components/features/Entreprendre/Réseau/EntreprendreReseau';
import { mockSmallScreen } from '~/client/components/window.mock';

describe('<RéseauÉconomieSocialeEtSolidaireList />', () => {
	beforeEach(() => {
		mockSmallScreen();
	});
	it('affiche correctement les liens vers les sites entreprises', () => {
		render(<RéseauÉconomieSocialeEtSolidaireList />);

		const links = screen.getAllByRole('link');
		links.forEach((link) => {
			expect(link).toHaveAttribute('title', expect.stringContaining('nouvelle fenêtre'));
		});
	});
});
