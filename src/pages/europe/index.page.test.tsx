/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { AnalyticsService } from '~/client/services/analytics/analytics.service';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import EuropePage from '~/pages/europe/index.page';
import { checkA11y } from '~/test-utils';

describe('Page Europe', () => {
	let analyticsService: AnalyticsService;
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({ asPath: '/' });
		analyticsService = anAnalyticsService();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		mockSmallScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<EuropePage />);
			</DependenciesProvider>);

		await waitFor(async () => {
			await checkA11y(container);
		});
	});

	it('affiche le titre de la page', () => {
		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<EuropePage />
			</DependenciesProvider>,
		);
		expect(screen.getByRole('heading', { name: 'Je cherche une expérience en Europe' })).toBeVisible();
	});

	it('affiche un lien Trouver un emploi en Europe', () => {
		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<EuropePage />
			</DependenciesProvider>,
		);

		const link = screen.getByRole('link', { name: 'Trouver un emploi en Europe' });
		expect(link).toBeVisible();
		expect(link).toHaveAttribute('href', 'https://ec.europa.eu/eures/portal/jv-se/home');
		expect(link).toHaveAttribute('title', 'Trouver un emploi en Europe - nouvelle fenêtre');
	});

	it('affiche un lien Faire une partie de mon apprentissage en Europe', () => {
		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<EuropePage />
			</DependenciesProvider>,
		);

		const link = screen.getByRole('link', { name: 'Faire une partie de mon apprentissage en Europe' });
		expect(link).toBeVisible();
		expect(link).toHaveAttribute('href', 'https://www.euroappmobility.eu/fr/');
		expect(link).toHaveAttribute('title', 'Faire une partie de mon apprentissage en Europe - nouvelle fenêtre');
	});

	it('affiche un lien Chercher un Volontariat International (V.I.E / V.I.A)', () => {
		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<EuropePage />
			</DependenciesProvider>,
		);

		const link = screen.getByRole('link', { name: 'Chercher un Volontariat International (V.I.E / V.I.A)' });
		expect(link).toBeVisible();
		expect(link).toHaveAttribute('href', 'https://mon-vie-via.businessfrance.fr/');
		expect(link).toHaveAttribute('title', 'Chercher un Volontariat International (V.I.E / V.I.A) - nouvelle fenêtre');
	});

	it('affiche un lien S‘engager dans une mission de solidarité en Europe', () => {
		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<EuropePage />
			</DependenciesProvider>,
		);

		const link = screen.getByRole('link', { name: 'S‘engager dans une mission de solidarité en Europe' });
		expect(link).toBeVisible();
		expect(link).toHaveAttribute('href', 'https://europa.eu/youth/solidarity/young-people/volunteering_fr');
		expect(link).toHaveAttribute('title', 'S‘engager dans une mission de solidarité en Europe - nouvelle fenêtre');
	});

	it('affiche un lien En savoir plus sur Le programme de mobilité ciblé EURES', () => {
		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<EuropePage />
			</DependenciesProvider>,
		);

		const link = screen.getAllByRole('link', { name: 'En savoir plus' })[0];
		expect(link).toBeVisible();
		expect(link).toHaveAttribute('href', 'https://ec.europa.eu/eures/public/eures-services/eures-targeted-mobility-scheme_fr');
		expect(link).toHaveAttribute('title', 'En savoir plus - nouvelle fenêtre');
	});

	it('affiche un lien En savoir plus sur Le programme “ERASMUS+”', () => {
		render(
			<DependenciesProvider
				analyticsService={analyticsService}
			>
				<EuropePage />
			</DependenciesProvider>,
		);

		const link = screen.getAllByRole('link', { name: 'En savoir plus' })[1];
		expect(link).toBeVisible();
		expect(link).toHaveAttribute('href', 'https://info.erasmusplus.fr/');
		expect(link).toHaveAttribute('title', 'En savoir plus - nouvelle fenêtre');
	});
});
