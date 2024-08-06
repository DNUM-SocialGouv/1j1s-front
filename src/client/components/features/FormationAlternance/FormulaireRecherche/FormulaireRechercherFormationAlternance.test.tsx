/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
	FormulaireRechercherFormationAlternance,
} from '~/client/components/features/FormationAlternance/FormulaireRecherche/FormulaireRechercherFormationAlternance';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockScrollIntoView, mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aCommuneQuery } from '~/client/hooks/useCommuneQuery';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { aMetier, aMetierService, aMetiersList } from '~/client/services/metiers/metier.fixture';
import { createSuccess } from '~/server/errors/either';
import { Formation } from '~/server/formations/domain/formation';
import { aCommune } from '~/server/localisations/domain/localisationAvecCoordonnées.fixture';

describe('FormulaireRechercherFormationAlternance', () => {
	beforeAll(() => {
		mockScrollIntoView();
	});
	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});

	it('affiche un formulaire', () => {
		render(
			<DependenciesProvider
				localisationService={aLocalisationService()}
				metierLbaService={aMetierService()}
			>
				<FormulaireRechercherFormationAlternance/>
			</DependenciesProvider>,
		);

		expect(screen.getByRole('form')).toBeVisible();
	});

	it('le premier champ est focus', () => {
		render(
			<DependenciesProvider
				localisationService={aLocalisationService()}
				metierLbaService={aMetierService()}
			>
				<FormulaireRechercherFormationAlternance/>
			</DependenciesProvider>,
		);

		expect(screen.getByRole('combobox', { name: 'Domaine Exemples : boulangerie, enseignement' })).toHaveFocus();
	});

	describe('recherche correcte', () => {
		it('lorsqu‘on recherche par localisation et par métier, les informations sont poussées dans l’url', async () => {
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });

			const localisationService = aLocalisationService();
			const metierService = aMetierService();
			jest.spyOn(metierService, 'rechercherMetier').mockResolvedValue(createSuccess([aMetier({
				code: 'F1201,F1202,I1101',
				label: 'Conduite de travaux, direction de chantier',
			})]));

			jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess({
				résultats: [aCommune({
					code: '75056',
					codePostal: '75006',
					coordonnées: {
						latitude: 48.859,
						longitude: 2.347,
					},
					ville: 'Paris',
				})],
			}));

			render(
				<DependenciesProvider
					localisationService={localisationService}
					metierLbaService={metierService}
				>
					<FormulaireRechercherFormationAlternance/>
				</DependenciesProvider>,
			);

			const user = userEvent.setup();
			const inputMétiers = screen.getByRole('combobox', { name: 'Domaine Exemples : boulangerie, enseignement' });
			await user.type(inputMétiers, 'Cond');
			await user.click(await screen.findByRole('option', { name: 'Conduite de travaux, direction de chantier' }));


			const comboboxCommune = screen.getByRole('combobox', { name: 'Localisation Exemples : Paris, Béziers…' });
			await user.type(comboboxCommune, 'Pari');
			await user.click(await screen.findByRole('option', { name: 'Paris (75006)' }));

			await user.click(screen.getByRole('button', { name: 'Rechercher' }));

			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('libelleMetier=Conduite+de+travaux%2C+direction+de+chantier') }, undefined, { scroll: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codeRomes=F1201%2CF1202%2CI1101') }, undefined, { scroll: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codeCommune=75056') }, undefined, { scroll: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('latitudeCommune=48.859') }, undefined, { scroll: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('longitudeCommune=2.347') }, undefined, { scroll: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codePostal=75006') }, undefined, { scroll: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('ville=Paris') }, undefined, { scroll: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('distanceCommune=10') }, undefined, { scroll: true });
		});

		it('lorsqu‘on recherche avec un niveau d’études, le niveau d‘étude est ajouté à l‘url', async () => {
			const routerPush = jest.fn();

			mockUseRouter({
				push: routerPush,
				query: {
					...aCommuneQuery({
						codeCommune: '75056',
						codePostal: '75001',
						latitudeCommune: '48.859',
						longitudeCommune: '2.347',
						ville: 'Paris',
					}),
					codeRomes: 'D1102,D1104',
					distanceCommune: '10',
					libelleMetier: 'Boulangerie, pâtisserie, chocolaterie',
				},
			});

			render(
				<DependenciesProvider
					localisationService={aLocalisationService()}
					metierLbaService={aMetierService()}
				>
					<FormulaireRechercherFormationAlternance/>
				</DependenciesProvider>,
			);

			const user = userEvent.setup();
			const selectNiveauEtudes = screen.getByRole('combobox', { name: 'Niveau d’études visé (facultatif) Exemples : CAP, Bac...' });
			await user.click(selectNiveauEtudes);
			await user.click(screen.getByRole('option', { name: Formation.NIVEAU_3.libellé }));

			await user.click(screen.getByRole('button', { name: 'Rechercher' }));

			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('niveauEtudes=3') }, undefined, { scroll: true });
		});
	});

	describe('recherche incorrecte', () => {
		it('lorsqu‘il manque la commune, n‘effectue pas de recherche', async () => {
			// Given
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const metierService = aMetierService();
			jest.spyOn(metierService, 'rechercherMetier').mockResolvedValue(createSuccess([aMetier({
				code: 'F1201,F1202,I1101',
				label: 'Conduite de travaux, direction de chantier',
			})]));

			// When
			render(
				<DependenciesProvider
					localisationService={aLocalisationService()}
					metierLbaService={metierService}
				>
					<FormulaireRechercherFormationAlternance/>
				</DependenciesProvider>,
			);

			const user = userEvent.setup();
			const inputMétiers = screen.getByRole('combobox', { name: 'Domaine Exemples : boulangerie, enseignement' });
			await user.type(inputMétiers, 'boulang');
			await user.click(await screen.findByRole('option', { name: 'Conduite de travaux, direction de chantier' }));

			const submitButton = screen.getByRole('button', { name: 'Rechercher' });
			await user.click(submitButton);

			expect(routerPush).not.toHaveBeenCalled();
		});

		it('lorsqu‘il manque le métier, n‘effectue pas de recherche', async () => {
			const user = userEvent.setup();
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });

			const localisationService = aLocalisationService();
			jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess({
				résultats: [aCommune({
					code: '75056',
					codePostal: '75006',
					coordonnées: {
						latitude: 48.859,
						longitude: 2.347,
					},
					ville: 'Paris',
				})],
			}));

			// When
			render(
				<DependenciesProvider
					localisationService={localisationService}
					metierLbaService={aMetierService()}
				>
					<FormulaireRechercherFormationAlternance/>
				</DependenciesProvider>,
			);


			const comboboxCommune = screen.getByRole('combobox', { name: 'Localisation Exemples : Paris, Béziers…' });
			await user.type(comboboxCommune, 'Pari');
			await user.click((await screen.findByRole('option', { name: 'Paris (75006)' })));

			await user.click(screen.getByRole('button', { name: 'Rechercher' }));

			expect(routerPush).not.toHaveBeenCalled();
		});
	});

	it('rempli automatiquement les champs lorsque les query params sont présents', async () => {
		mockUseRouter({
			query: {
				codeRomes: 'D1102,D1104',
				distanceCommune: '30',
				libelleMetier: 'Boulangerie, pâtisserie, chocolaterie',
				niveauEtudes: '4',
				...aCommuneQuery({
					codeCommune: '75056',
					codePostal: '75001',
					latitudeCommune: '48.859',
					longitudeCommune: '2.347',
					ville: 'Paris',
				}),
			},
		});
		render(
			<DependenciesProvider localisationService={aLocalisationService()} metierLbaService={aMetierService()}>
				<FormulaireRechercherFormationAlternance/>
			</DependenciesProvider>,
		);

		const domaine = screen.getByRole('combobox', { name: 'Domaine Exemples : boulangerie, enseignement' });
		expect(domaine).toHaveValue('Boulangerie, pâtisserie, chocolaterie');

		const localisation = await screen.findByRole('combobox', { name: 'Localisation Exemples : Paris, Béziers…' });
		expect(localisation).toHaveValue('Paris (75001)');

		const selectRayon = screen.getByRole('combobox', { name: /Rayon/i });
		expect(selectRayon).toHaveTextContent('30 km');
		expect(screen.getByDisplayValue('30')).toBeInTheDocument();

		const niveau = screen.getByRole('combobox', { name: /Niveau d’études visé/i });
		expect(niveau).toHaveTextContent('Bac, autres formations niveau 4');

		const formulaireRechercheFormation = screen.getByRole('form');
		expect(formulaireRechercheFormation).toHaveFormValues({
			codeRomes: 'D1102,D1104',
			distanceCommune: '30',
			libelleMetier: 'Boulangerie, pâtisserie, chocolaterie',
			niveauEtudes: '4',
			...aCommuneQuery({
				codeCommune: '75056',
				codePostal: '75001',
				latitudeCommune: '48.859',
				longitudeCommune: '2.347',
				ville: 'Paris',
			}),
		});
	});

	it('laisse le champ métier vide quand il manque les codes romes dans les query params', () => {
		mockUseRouter({
			query: {
				libelleMetier: 'Boulangerie, pâtisserie, chocolaterie',
			},
		});

		render(
			<DependenciesProvider localisationService={aLocalisationService()} metierLbaService={aMetierService()}>
				<FormulaireRechercherFormationAlternance/>
			</DependenciesProvider>,
		);

		const domaine = screen.getByRole('combobox', { name: 'Domaine Exemples : boulangerie, enseignement' });
		expect(domaine).toHaveValue('');
		const form = screen.getByRole('form');
		expect(form).not.toHaveFormValues({
			codeRomes: expect.anything(),
			libelleMetier: expect.anything(),
		});
	});

	it('laisse le champ métier vide quand il manque le libellé dans les query params', () => {
		mockUseRouter({
			query: {
				codeRomes: 'D1102,D1104',
			},
		});

		render(
			<DependenciesProvider localisationService={aLocalisationService()} metierLbaService={aMetierService()}>
				<FormulaireRechercherFormationAlternance/>
			</DependenciesProvider>,
		);

		const domaine = screen.getByRole('combobox', { name: 'Domaine Exemples : boulangerie, enseignement' });
		expect(domaine).toHaveValue('');
		const form = screen.getByRole('form');
		expect(form).not.toHaveFormValues({
			codeRomes: expect.anything(),
			libelleMetier: expect.anything(),
		});
	});
});
