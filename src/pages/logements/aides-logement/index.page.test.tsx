/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import AidesLogement from '~/pages/logements/aides-logement/index.page';

describe('Les aides au logement', () => {
	describe('La carte partenaire de la CAF', () => {
		it('ouvre le simulateur de la CAF dans un nouvel onglet', () => {
			mockUseRouter({});
			mockSmallScreen();
			render(<AidesLogement/>);

			const link = screen.getByRole('link', { name: /Tester mon éligibilité pour les aides au logement de la CAF/ });

			expect(link).toHaveAttribute('href', 'https://wwwd.caf.fr/wps/portal/caffr/aidesetdemarches/mesdemarches/faireunesimulation/lelogement#/preparation');
			expect(link).toHaveAttribute('target', '_blank');
		});
	});
});
