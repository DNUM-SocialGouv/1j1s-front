/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ConsulterOffreStagePage from '~/pages/stages/[id].page';
import { anOffreDeStage } from '~/server/cms/domain/offreDeStage.fixture';

describe('<ConsulterOffreStagePage />', () => {
	const offreDeStage = anOffreDeStage();

	beforeEach(() => {
		mockUseRouter({});
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<ConsulterOffreStagePage offreDeStage={offreDeStage} />
			</DependenciesProvider>,
		);

		expect(container).toBeAccessible();
	});

	it('affiche le bouton "Je donne mon avis"', () => {
		render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<ConsulterOffreStagePage offreDeStage={offreDeStage} />
			</DependenciesProvider>,
		);

		const textDonnerMonAvis = screen.getByText('Aidez-nous à améliorer la recherche de stage ! Donnez-nous votre avis sur cette démarche, cela ne prend que 2 minutes');
		const linkDonnerMonAvis = screen.getByRole('link', { name: 'Je donne mon avis' });

		expect(textDonnerMonAvis).toBeVisible();
		expect(linkDonnerMonAvis).toHaveAttribute('href', 'https://jedonnemonavis.numerique.gouv.fr/Demarches/3639?&view-mode=formulaire-avis&nd_source=button&key=8ff5d31556dab600903ec418c6079a86');
		expect(linkDonnerMonAvis).toBeVisible();
	});
});
