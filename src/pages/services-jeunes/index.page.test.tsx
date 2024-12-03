/**
 * @jest-environment jsdom
 */
import '~/test-utils';

import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { mockUsePathname, mockUseSearchParams } from '~/client/components/next-navigation.mock';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockScrollIntoView, mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aManualAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ServicesJeunePage, { getStaticProps } from '~/pages/services-jeunes/index.page';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { mapCodeCategorieServiceJeuneToLibelle, ServiceJeune } from '~/server/services-jeunes/domain/servicesJeunes';
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
		mockUseSearchParams({ getAll: jest.fn().mockReturnValue([]) });
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
			describe('Sélection des filtres', () => {
				describe('aucun filtre n’est renseigné', () => {
					it('affiche l’ensemble des types de services', () => {
						// Given
						const serviceJeuneList = [
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.ACCOMPAGNEMENT,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ACCOMPAGNEMENT),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.AIDES_FINANCIERES,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.AIDES_FINANCIERES),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.ENGAGEMENT,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ENGAGEMENT),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.ENTREE_VIE_PROFESSIONELLE,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ENTREE_VIE_PROFESSIONELLE),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.LOGEMENT,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.LOGEMENT),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.ORIENTATION_FORMATION,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ORIENTATION_FORMATION),
								},
							}),
						];

						// When
						render(
							<DependenciesProvider analyticsService={aManualAnalyticsService()}>
								<ServicesJeunePage serviceJeuneList={serviceJeuneList} />
							</DependenciesProvider>,
						);

						// Then
						const [/* tagList */, servicesJeunesList] = screen.getAllByRole('list');
						const servicesJeunesResultats = within(servicesJeunesList).getAllByRole('listitem');
						expect(servicesJeunesResultats.length).toBe(6);
					});
				});
				describe('au moins un filtre est renseigné', () => {
					it('n’utilise pas des filtres qui ne correspondent à aucune catégorie', () => {
						// Given
						mockUseRouter({ push: jest.fn() });
						mockUseSearchParams({ getAll: jest.fn().mockReturnValue([
							'un-mauvais-filtre',
							ServiceJeune.CodeCategorie.LOGEMENT,
						]) });

						const serviceJeuneList = [
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.ACCOMPAGNEMENT,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ACCOMPAGNEMENT),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.AIDES_FINANCIERES,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.AIDES_FINANCIERES),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.ENGAGEMENT,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ENGAGEMENT),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.ENTREE_VIE_PROFESSIONELLE,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ENTREE_VIE_PROFESSIONELLE),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.LOGEMENT,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.LOGEMENT),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.ORIENTATION_FORMATION,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ORIENTATION_FORMATION),
								},
							}),
						];

						// When
						render(
							<DependenciesProvider analyticsService={aManualAnalyticsService()}>
								<ServicesJeunePage serviceJeuneList={serviceJeuneList} />
							</DependenciesProvider>,
						);

						// Then
						const [tagList  /*servicesJeunesList*/] = screen.getAllByRole('list');
						const servicesJeunesEtiquettes = within(tagList).getAllByRole('listitem');
						expect(servicesJeunesEtiquettes.length).toBe(1);
					});
					it('affiche la liste des filtres dans des étiquettes', () => {
						// Given
						mockUseRouter({ push: jest.fn() });
						mockUseSearchParams({ getAll: jest.fn().mockReturnValue([
							ServiceJeune.CodeCategorie.ACCOMPAGNEMENT,
							ServiceJeune.CodeCategorie.LOGEMENT,
							ServiceJeune.CodeCategorie.ENGAGEMENT,
						]) });

						const serviceJeuneList = [
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.ACCOMPAGNEMENT,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ACCOMPAGNEMENT),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.AIDES_FINANCIERES,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.AIDES_FINANCIERES),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.ENGAGEMENT,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ENGAGEMENT),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.ENTREE_VIE_PROFESSIONELLE,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ENTREE_VIE_PROFESSIONELLE),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.LOGEMENT,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.LOGEMENT),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.ORIENTATION_FORMATION,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ORIENTATION_FORMATION),
								},
							}),
						];

						// When
						render(
							<DependenciesProvider analyticsService={aManualAnalyticsService()}>
								<ServicesJeunePage serviceJeuneList={serviceJeuneList} />
							</DependenciesProvider>,
						);

						// Then
						const [tagList /*servicesJeunesList*/] = screen.getAllByRole('list');
						const servicesJeunesEtiquettes = within(tagList).getAllByRole('listitem');
						expect(servicesJeunesEtiquettes.length).toBe(3);
					});
					it('supprime le filtre au clic sur son étiquette', async () => {
						// Given
						const routerPush = jest.fn();
						mockUseRouter({ push: routerPush });
						mockUseSearchParams({ getAll: jest.fn().mockReturnValue([
							ServiceJeune.CodeCategorie.ACCOMPAGNEMENT,
							ServiceJeune.CodeCategorie.LOGEMENT,
							ServiceJeune.CodeCategorie.ENGAGEMENT,
						]) });
						mockUsePathname('/services-jeunes');
						const user = userEvent.setup();

						const serviceJeuneList = [
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.ACCOMPAGNEMENT,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ACCOMPAGNEMENT),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.AIDES_FINANCIERES,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.AIDES_FINANCIERES),
								},
							}),
						];

						// When
						render(
							<DependenciesProvider analyticsService={aManualAnalyticsService()}>
								<ServicesJeunePage serviceJeuneList={serviceJeuneList} />
							</DependenciesProvider>,
						);
						const [ tagList /* servicesJeunesList */] = screen.getAllByRole('list');
						const servicesJeunesEtiquettes = within(tagList).getAllByRole('listitem');
						expect(servicesJeunesEtiquettes.length).toBe(3);

						const resetButton = within(servicesJeunesEtiquettes[0]).getByRole('button');
						await user.click(resetButton);

						// Then
						expect(routerPush).toHaveBeenCalledTimes(1);
						expect(routerPush).toHaveBeenCalledWith(expect.not.stringContaining('filtre=accompagnement'), undefined, expect.anything());
						expect(routerPush).toHaveBeenCalledWith(expect.stringContaining('filtre=logement'), undefined, expect.anything());
						expect(routerPush).toHaveBeenCalledWith(expect.stringContaining('filtre=engagement'), undefined, expect.anything());
					});
					it('affiche les services des catégories filtrées', () => {
						mockUseSearchParams({ getAll: jest.fn().mockReturnValue([ServiceJeune.CodeCategorie.ACCOMPAGNEMENT]) });

						const serviceJeuneList = [
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.ACCOMPAGNEMENT,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ACCOMPAGNEMENT),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.AIDES_FINANCIERES,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.AIDES_FINANCIERES),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.ENGAGEMENT,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ENGAGEMENT),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.ENTREE_VIE_PROFESSIONELLE,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ENTREE_VIE_PROFESSIONELLE),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.LOGEMENT,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.LOGEMENT),
								},
							}),
							aServiceJeune({
								categorie: {
									code: ServiceJeune.CodeCategorie.ORIENTATION_FORMATION,
									libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.ORIENTATION_FORMATION),
								},
							}),
						];

						// When
						render(
							<DependenciesProvider analyticsService={aManualAnalyticsService()}>
								<ServicesJeunePage serviceJeuneList={serviceJeuneList} />
							</DependenciesProvider>,
						);

						// Then
						const [/* tagList */, servicesJeunesList] = screen.getAllByRole('list');
						const servicesJeunesResultats = within(servicesJeunesList).getAllByRole('listitem');
						expect(servicesJeunesResultats.length).toBe(1);
					});
				});
			});
			describe('Liste de résultats', () => {
				it('affiche un message d’erreur quand aucun service n’est disponible', () => {
					// Given
					mockUseSearchParams({ getAll: jest.fn().mockReturnValue([ServiceJeune.CodeCategorie.ACCOMPAGNEMENT]) });
					const serviceJeuneList = [
						aServiceJeune({
							categorie: {
								code: ServiceJeune.CodeCategorie.AIDES_FINANCIERES,
								libelle: mapCodeCategorieServiceJeuneToLibelle(ServiceJeune.CodeCategorie.AIDES_FINANCIERES),
							},
						}),
					];

					// When
					render(
						<DependenciesProvider analyticsService={aManualAnalyticsService()}>
							<ServicesJeunePage serviceJeuneList={serviceJeuneList} />
						</DependenciesProvider>,
					);

					// Then
					const messageErreur = screen.getByText('Aucun service disponible. Veuillez modifier votre sélection.');
					expect(messageErreur).toBeVisible();
				});
				it('affiche au maximum 6 services initialement', () => {
				// Given
					const serviceJeuneList = new Array(7).fill(aServiceJeune());

					// When
					render(
						<DependenciesProvider analyticsService={aManualAnalyticsService()}>
							<ServicesJeunePage serviceJeuneList={serviceJeuneList} />
						</DependenciesProvider>,
					);

					// Then
					const [/* tagList */, servicesJeunesList] = screen.getAllByRole('list');
					const servicesJeunesResultats = within(servicesJeunesList).getAllByRole('listitem');
					expect(servicesJeunesResultats.length).toBe(6);
				});
				it('affiche un bouton voir plus quand il y a plus de 6 services', () => {
				// Given
					const serviceJeuneList = new Array(7).fill(aServiceJeune());

					// When
					render(
						<DependenciesProvider analyticsService={aManualAnalyticsService()}>
							<ServicesJeunePage serviceJeuneList={serviceJeuneList} />
						</DependenciesProvider>,
					);

					// Then
					const voirPlusDeServicesJeunesBouton = screen.getByRole('button', { name: 'Voir plus de services conçus pour les jeunes' });
					expect(voirPlusDeServicesJeunesBouton).toBeVisible();
				});
				it('affiche un bouton voir moins quand plus de 6 services jeunes sont visibles', async () => {
				// Given
					const serviceJeuneList = new Array(7).fill(aServiceJeune());

					render(
						<DependenciesProvider analyticsService={aManualAnalyticsService()}>
							<ServicesJeunePage  serviceJeuneList={serviceJeuneList} />
						</DependenciesProvider>,
					);
					const voirPlusDeServicesJeunesBouton = screen.getByRole('button', { name: 'Voir plus de services conçus pour les jeunes' });

					// When
					await userEvent.click(voirPlusDeServicesJeunesBouton);

					// Then
					const voirMoinsDeServicesJeunesBouton = screen.getByRole('button', { name: 'Voir moins de services conçus pour les jeunes' });
					expect(voirMoinsDeServicesJeunesBouton).toBeVisible();
				});
			});
		});
	});
});
