/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
	FormulaireRechercheAlternance,
} from '~/client/components/features/Alternance/FormulaireRecherche/FormulaireRechercheAlternance';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAlternanceService } from '~/client/services/alternance/alternance.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import { aMétierService } from '~/client/services/métiers/métier.fixture';
import {
	aRésultatRechercherMultipleAlternance,
} from '~/server/alternances/domain/alternance.fixture';
import { Métier } from '~/server/metiers/domain/métier';
import { aListeDeMetierLaBonneAlternance } from '~/server/metiers/domain/métier.fixture';

jest.mock('lodash/debounce', () =>
	jest.fn((fn) => {
		fn.cancel = jest.fn();
		return fn;
	}));

describe('FormulaireRechercheAlternance', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	describe('quand le composant est affiché sans recherche', () => {
		it('affiche un formulaire pour la recherche d‘alternance, sans échantillon de résultat', async () => {
			// GIVEN
			const alternanceService = anAlternanceService();
			const métierService = aMétierService();
			const localisationService = aLocalisationService();
			mockUseRouter({});

			// WHEN
			render(
				<DependenciesProvider
					alternanceService={alternanceService}
					métierService={métierService}
					localisationService={localisationService}
				>
					<FormulaireRechercheAlternance/>
				</DependenciesProvider>,
			);
			const formulaireRechercheAlternance = screen.getByRole('form');

			// THEN
			expect(formulaireRechercheAlternance).toBeInTheDocument();
			expect(alternanceService.rechercherAlternance).toHaveBeenCalledTimes(0);
		});
	});

	describe('lorsqu‘on recherche par commune et par métier', () => {
		it('filtre les résultats par localisation et métier', async () => {
			// Given
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const aMétierList: Array<Métier> = [{
				label: 'Conduite de travaux, direction de chantier',
				romes: ['F1201', 'F1202', 'I1101'],
			}];
			const expectedLibelle = 'Conduite+de+travaux%2C+direction+de+chantier';
			const expectedCodeRomes = 'F1201%2CF1202%2CI1101';
			const libelleCommune = 'Paris+%2875006%29';
			const longitudeCommune = '2.347';
			const latitudeCommune = '48.859';
			const codeCommune = '75056';
			const distanceCommune = '10';


			const localisationService = aLocalisationService();
			const alternanceService = anAlternanceService(aRésultatRechercherMultipleAlternance());
			const métierService = aMétierService(aMétierList);
			// When
			render(
				<DependenciesProvider
					alternanceService={alternanceService}
					métierService={métierService}
					localisationService={localisationService}
				>
					<FormulaireRechercheAlternance/>
				</DependenciesProvider>,
			);

			const user = userEvent.setup();
			const inputMétiers = screen.getByLabelText('Sélectionnez un domaine');
			await user.type(inputMétiers, 'boulang');
			await user.click(screen.getByRole('option', { name: aListeDeMetierLaBonneAlternance()[0].label }));


			const inputCommune = screen.getByLabelText('Localisation');
			await user.type(inputCommune, 'Pari');
			await user.click(screen.getAllByRole('option')[0]);

			const submitButton = screen.getByRole('button', { name: 'Rechercher' });
			await user.click(submitButton);

			// Then
			const expectedQuery = `libelleMetier=${expectedLibelle}&codeRomes=${expectedCodeRomes}&libelleCommune=${libelleCommune}&codeCommune=${codeCommune}&latitudeCommune=${latitudeCommune}&longitudeCommune=${longitudeCommune}&distanceCommune=${distanceCommune}`;
			expect(routerPush).toHaveBeenCalledWith({ query: expectedQuery }, undefined, { shallow: true });
		});
	});

	describe('lorsqu‘on recherche par métier mais pas par commune', () => {
		it('n‘effectue pas de recherche', async () => {
			// Given
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const aMétierList: Array<Métier> = [{
				label: 'Conduite de travaux, direction de chantier',
				romes: ['F1201', 'F1202', 'I1101'],
			}];

			const localisationService = aLocalisationService();
			const alternanceService = anAlternanceService(aRésultatRechercherMultipleAlternance());
			const métierService = aMétierService(aMétierList);
			// When
			render(
				<DependenciesProvider
					alternanceService={alternanceService}
					métierService={métierService}
					localisationService={localisationService}
				>
					<FormulaireRechercheAlternance/>
				</DependenciesProvider>,
			);

			const user = userEvent.setup();
			const inputMétiers = screen.getByLabelText('Sélectionnez un domaine');
			await user.type(inputMétiers, 'boulang');
			await user.click(screen.getByRole('option', { name: aListeDeMetierLaBonneAlternance()[0].label }));

			const submitButton = screen.getByRole('button', { name: 'Rechercher' });
			await user.click(submitButton);

			// Then
			expect(routerPush).not.toHaveBeenCalled();
		});
	});

	describe('lorsqu‘on recherche par commune mais pas par métier', () => {
		it('n‘effectue pas de recherche', async () => {
			// Given
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const aMétierList: Array<Métier> = [{
				label: 'Conduite de travaux, direction de chantier',
				romes: ['F1201', 'F1202', 'I1101'],
			}];

			const localisationService = aLocalisationService();
			const alternanceService = anAlternanceService(aRésultatRechercherMultipleAlternance());
			const métierService = aMétierService(aMétierList);
			// When
			render(
				<DependenciesProvider
					alternanceService={alternanceService}
					métierService={métierService}
					localisationService={localisationService}
				>
					<FormulaireRechercheAlternance/>
				</DependenciesProvider>,
			);

			const user = userEvent.setup();

			const inputCommune = screen.getByLabelText('Localisation');
			await user.type(inputCommune, 'Pari');
			await user.click(screen.getAllByRole('option')[0]);

			const submitButton = screen.getByRole('button', { name: 'Rechercher' });
			await user.click(submitButton);

			// Then
			expect(routerPush).not.toHaveBeenCalled();
		});
	});

	it('rempli automatiquement les champs lorsque les query params sont présents', () => {
		mockUseRouter({ query: {
			codeCommune: '75056',
			codeRomes: 'D1102,D1104',
			distanceCommune: '10',
			latitudeCommune: '48.859',
			libelleCommune: 'Paris (75001)',
			libelleMetier: 'Boulangerie, pâtisserie, chocolaterie',
			longitudeCommune: '2.347',
		} });

		render(
			<DependenciesProvider métierService={aMétierService()} localisationService={aLocalisationService()}>
				<FormulaireRechercheAlternance />
			</DependenciesProvider>,
		);

		const domaine = screen.getByRole('textbox', { name: /Sélectionnez un domaine/i });
		expect(domaine).toHaveValue('Boulangerie, pâtisserie, chocolaterie');
		const localisation = screen.getByRole('textbox', { name: /Localisation/i });
		expect(localisation).toHaveValue('Paris (75001)');
		const rayon = screen.getByTestId('Select-InputHidden');
		expect(rayon).toHaveValue('10');
	});
});
