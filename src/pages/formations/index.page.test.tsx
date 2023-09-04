/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { AnalyticsService } from '~/client/services/analytics/analytics.service';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import FormationPage from '~/pages/formations/index.page';

describe('Page FormationPage', () => {
	let analyticsService: AnalyticsService;
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({ asPath: '/' });
		analyticsService = anAnalyticsService();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const { container } = render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<FormationPage />);
			</DependenciesProvider>);

		await expect(container).toBeAccessible();
	});

	it('affiche le titre de la page', () => {
		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<FormationPage />
			</DependenciesProvider>,
		);
		expect(screen.getByRole('heading', { name: 'Je trouve une formation pour réaliser mon projet professionnel' })).toBeVisible();
	});

	it('affiche un lien Trouver sa formation', () => {
		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<FormationPage />
			</DependenciesProvider>,
		);

		const link = screen.getByRole('link', { name: 'Trouver sa formation' });
		expect(link).toBeVisible();
		expect(link).toHaveAttribute('href', 'https://reseau.intercariforef.org/');
		expect(link).toHaveAttribute('title', 'Trouver sa formation - nouvelle fenêtre');
	});

	it('affiche un lien Découvrez le dispositif Mon compte formation', () => {
		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<FormationPage />
			</DependenciesProvider>,
		);

		const link = screen.getByRole('link', { name: /Découvrez le dispositif Mon compte formation/ });
		expect(link).toBeVisible();
		expect(link).toHaveAttribute('href', 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/');
		expect(link).toHaveAttribute('title', 'Accéder à mon compte formation - nouvelle fenêtre');
	});

	it('affiche un lien La plateforme de pré-inscription en première année de l’enseignement supérieur', () => {
		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<FormationPage />
			</DependenciesProvider>,
		);

		const link = screen.getByRole('link', { name: /La plateforme de pré-inscription en première année de l’enseignement supérieur/ });
		expect(link).toBeVisible();
		expect(link).toHaveAttribute('href', 'https://www.parcoursup.fr/');
		expect(link).toHaveAttribute('title', 'Accéder à Parcoursup - nouvelle fenêtre');
	});

	it('affiche un lien Besoin d‘informations sur les métiers ?', () => {
		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<FormationPage />
			</DependenciesProvider>,
		);

		const link = screen.getByRole('link', { name: /Besoin d‘informations sur les métiers ?/ });
		expect(link).toBeVisible();
		expect(link).toHaveAttribute('href', '/decouvrir-les-metiers');
		expect(link).not.toHaveAttribute('title');
	});

	it('affiche un lien Renseignez-vous sur les métiers du soin', () => {
		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<FormationPage />
			</DependenciesProvider>,
		);

		const link = screen.getByRole('link', { name: /Renseignez-vous sur les métiers du soin/ });
		expect(link).toBeVisible();
		expect(link).toHaveAttribute('href', 'https://solidarites-sante.gouv.fr/metiers-et-concours/metiers-soin-et-accompagnement/metiersdusoin');
		expect(link).toHaveAttribute('title', 'En savoir plus - nouvelle fenêtre');
	});
});
