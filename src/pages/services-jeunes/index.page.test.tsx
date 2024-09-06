/**
 * @jest-environment jsdom
 */
import '~/test-utils';

import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockScrollIntoView, mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ServicesJeunePage, { getStaticProps } from '~/pages/services-jeunes/index.page';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aServiceJeune, aServiceJeuneList } from '~/server/services-jeunes/domain/servicesJeunes.fixture';
import { dependencies } from '~/server/start';


jest.mock('~/server/start', () => ({
	dependencies: {
		cmsDependencies: {
			duréeDeValiditéEnSecondes: jest.fn(),
		},
		servicesJeunesDependencies: {
			consulterLesServicesJeunesUseCase: {
				handle: jest.fn(),
			},
		},
	},
}));

describe('Page Services Jeunes', () => {
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
		mockScrollIntoView();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('lorsque le feature flip old espace jeune est actif, redirige vers la page 404', async () => {
		// Given
		process.env.NEXT_PUBLIC_OLD_ESPACE_JEUNE_FEATURE = '1';

		// When
		const result = await getStaticProps();

		// Then
		expect(result).toEqual({ notFound: true });
	});
	describe('lorsque le feature flip old espace jeune est désactivé', () => {
		beforeEach(() => {
			process.env.NEXT_PUBLIC_OLD_ESPACE_JEUNE_FEATURE = '0';
		});

		it('doit rendre du HTML respectant la specification', () => {
			// Given
			const serviceJeuneList = aServiceJeuneList();
			mockUseRouter({});
			mockSmallScreen();

			// When
			const { container } = render(<DependenciesProvider analyticsService={aManualAnalyticsService()}>
				<ServicesJeunePage serviceJeuneList={serviceJeuneList} />
			</DependenciesProvider>);

			// Then
			expect(container.outerHTML).toHTMLValidate();
		});
		it('n‘a pas de défaut d‘accessibilité', async () => {
			// Given
			const serviceJeuneList = aServiceJeuneList();
			mockUseRouter({});
			mockSmallScreen();

			// When
			const { container } = render(
				<DependenciesProvider
					analyticsService={aManualAnalyticsService()}>
					<ServicesJeunePage
						serviceJeuneList={serviceJeuneList} />);
				</DependenciesProvider>);

			// Then
			await expect(container).toBeAccessible();
		});
		it('envoie les analytics de la page à son affichage', () => {
			// Given
			const serviceJeuneList = aServiceJeuneList();
			const analyticsService = aManualAnalyticsService();

			// When
			render(
				<DependenciesProvider
					analyticsService={analyticsService}>
					<ServicesJeunePage serviceJeuneList={serviceJeuneList} />
				</DependenciesProvider>,
			);

			// Then
			expect(analyticsService.envoyerAnalyticsPageVue).toHaveBeenCalledWith({
				page_template: 'contenu_liste_niv_1',
				pagegroup: 'service_jeune_liste',
				pagelabel: 'contenu_liste_niv_1',
				'segment-site': 'contenu_liste',
			});
		});

		it('appelle le serveur pour récupérer les actualités', async () => {
			// Given
			jest.spyOn(dependencies.servicesJeunesDependencies.consulterLesServicesJeunesUseCase, 'handle').mockResolvedValue(createSuccess(aServiceJeuneList()));

			// When
			await getStaticProps();

			// Then
			expect(dependencies.servicesJeunesDependencies.consulterLesServicesJeunesUseCase.handle).toHaveBeenCalledTimes(1);
		});

		it('quand le service est indisponible, retourne une 404', async () => {
			// Given
			jest.spyOn(dependencies.servicesJeunesDependencies.consulterLesServicesJeunesUseCase, 'handle').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));

			// When
			const result = await getStaticProps();

			// Then
			expect(result).toEqual({ notFound: true, revalidate: 1 });
		});

		describe('Si des services jeunes sont récupérés', () => {
			it('affiche au maximum 6 services initialement', () => {
				// Given
				const serviceJeuneList = [
					aServiceJeune({ titre: 'service 1' }),
					aServiceJeune({ titre: 'service 2' }),
					aServiceJeune({ titre: 'service 3' }),
					aServiceJeune({ titre: 'service 4' }),
					aServiceJeune({ titre: 'service 5' }),
					aServiceJeune({ titre: 'service 6' }),
					aServiceJeune({ titre: 'service 7' }),
				];
				const analyticsService = aManualAnalyticsService();

				// When
				render(
					<DependenciesProvider analyticsService={analyticsService}>
						<ServicesJeunePage serviceJeuneList={serviceJeuneList} />
					</DependenciesProvider>,
				);

				// Then
				const mesuresJeunesSection = screen.getByRole('region', { name: 'les services jeunes' });
				const servicesJeunesList = within(mesuresJeunesSection).getAllByRole('listitem');
				expect(servicesJeunesList.length).toBe(6);
			});
			it('affiche un bouton voir plus quand il y a plus de 6 services', () => {
				// Given
				const serviceJeuneList = [
					aServiceJeune({ titre: 'service 1' }),
					aServiceJeune({ titre: 'service 2' }),
					aServiceJeune({ titre: 'service 3' }),
					aServiceJeune({ titre: 'service 4' }),
					aServiceJeune({ titre: 'service 5' }),
					aServiceJeune({ titre: 'service 6' }),
					aServiceJeune({ titre: 'service 7' }),
				];
				const analyticsService = aManualAnalyticsService();

				// When
				render(
					<DependenciesProvider analyticsService={analyticsService}>
						<ServicesJeunePage serviceJeuneList={serviceJeuneList} />
					</DependenciesProvider>,
				);

				// Then
				const mesuresJeunesSection = screen.getByRole('region', { name: 'les services jeunes' });
				const voirPlusDeServicesJeunesBouton = within(mesuresJeunesSection).getByRole('button', { name: 'Voir plus de résultats sur les services conçus pour les jeunes' });
				expect(voirPlusDeServicesJeunesBouton).toBeVisible();
			});
			it('affiche un bouton voir moins quand plus de 6 services jeunes sont visibles', async () => {
				// Given
				const serviceJeuneList = [
					aServiceJeune({ titre: 'service 1' }),
					aServiceJeune({ titre: 'service 2' }),
					aServiceJeune({ titre: 'service 3' }),
					aServiceJeune({ titre: 'service 4' }),
					aServiceJeune({ titre: 'service 5' }),
					aServiceJeune({ titre: 'service 6' }),
					aServiceJeune({ titre: 'service 7' }),
				];
				const analyticsService = aManualAnalyticsService();

				render(
					<DependenciesProvider analyticsService={analyticsService}>
						<ServicesJeunePage  serviceJeuneList={serviceJeuneList} />
					</DependenciesProvider>,
				);
				const mesuresJeunesSection = screen.getByRole('region', { name: 'les services jeunes' });
				const voirPlusDeServicesJeunesBouton = within(mesuresJeunesSection).getByRole('button', { name: 'Voir plus de résultats sur les services conçus pour les jeunes' });

				// When
				await userEvent.click(voirPlusDeServicesJeunesBouton);

				// Then
				const voirMoinsDeServicesJeunesBouton = within(mesuresJeunesSection).getByRole('button', { name: 'Voir moins de résultats sur les services conçus pour les jeunes' });
				expect(voirMoinsDeServicesJeunesBouton).toBeVisible();
			});
		});
	});
});
