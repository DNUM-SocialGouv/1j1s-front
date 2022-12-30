/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { mockSmallScreen } from '~/client/components/window.mock';
import DéposerUneOffreDEmploi from '~/pages/je-recrute/deposer-une-offre-d-emploi/index.page';

describe('Je recrute / Déposer une offre d‘emploi', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	it('affiche un formulaire de référencement des entreprises dans une iframe', () => {
		render(<DéposerUneOffreDEmploi />);

		const iframe = screen.getByTitle('Formulaire de dépôt d‘offre d‘emploi ou d‘alternance en partenariat avec Pôle Emploi');

		expect(iframe).toBeInTheDocument();
	});

	it('propose des liens vers les conditions générales d‘utilisation et la politique de confidentialité', () => {
		render(<DéposerUneOffreDEmploi />);

		const lienConditionsGénéralesUtilisation = screen.getByRole('link', { name: 'Conditions Générales d‘Utilisation' });
		const lienPolitiqueConfidentialité = screen.getByRole('link', { name: 'Politique de Confidentialité' });

		expect(lienConditionsGénéralesUtilisation).toBeInTheDocument();
		expect(lienPolitiqueConfidentialité).toBeInTheDocument();
	});
});
