/**
 * @jest-environment jsdom
 */

import {
	render,
	screen,
	within,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
	FormulaireRechercherFormation,
} from '~/client/components/features/Formation/FormulaireRecherche/FormulaireRechercherFormation';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aCommuneQuery } from '~/client/hooks/useCommuneQuery';
import { aFormationService, aRésultatFormation } from '~/client/services/formation/formation.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { aMetierService } from '~/client/services/metiers/metier.fixture';
import { Metier } from '~/server/metiers/domain/metier';
import { aListeDeMetierLaBonneAlternance } from '~/server/metiers/domain/métier.fixture';

describe('FormulaireRechercherFormation', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	describe('quand le composant est affiché sans recherche', () => {
		it('affiche un formulaire pour la recherche de formation, sans échantillon de résultat', async () => {
			// GIVEN
			const formationService = aFormationService(aRésultatFormation());
			const métierService = aMetierService();
			const localisationService = aLocalisationService();
			mockUseRouter({});

			// WHEN
			render(
				<DependenciesProvider
					formationService={formationService}
					metierService={métierService}
					localisationService={localisationService}
				>
					<FormulaireRechercherFormation/>
				</DependenciesProvider>,
			);
			const formulaireRechercheFormation = screen.getByRole('form');

			// THEN
			expect(formulaireRechercheFormation).toBeInTheDocument();
			expect(formationService.rechercherFormation).toHaveBeenCalledTimes(0);
		});
	});

	describe('lorsqu‘on recherche par localisation et par métier', () => {
		it('les informations sur la localisation et le métier sont poussées dans l’url', async () => {
			// Given
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const aMetierList: Array<Metier> = [{
				label: 'Conduite de travaux, direction de chantier',
				romes: ['F1201', 'F1202', 'I1101'],
			}];

			const localisationService = aLocalisationService();
			const formationService = aFormationService(aRésultatFormation());
			const métierService = aMetierService(aMetierList);

			// When
			render(
				<DependenciesProvider
					formationService={formationService}
					metierService={métierService}
					localisationService={localisationService}>
					<FormulaireRechercherFormation/>
				</DependenciesProvider>,
			);

			const user = userEvent.setup();
			const inputMétiers = screen.getByRole('combobox', { name: /Domaine/i });
			await user.type(inputMétiers, 'boulang');
			await user.click(await screen.findByRole('option', { name: aListeDeMetierLaBonneAlternance()[0].label }));

			const comboboxCommune = screen.getByRole('combobox', { name: 'Localisation' });
			await user.type(comboboxCommune, 'Pari');
			const localisatoinOptions = await screen.findAllByRole('option');
			await user.click(localisatoinOptions[0]);

			const submitButton = screen.getByRole('button', { name: 'Rechercher' });
			await user.click(submitButton);

			// Then
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('libelleMetier=Conduite+de+travaux%2C+direction+de+chantier' ) }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codeRomes=F1201%2CF1202%2CI1101' ) }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('libelleCommune=Paris+%2875006%29' ) }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codeCommune=75056' ) }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('latitudeCommune=48.859' ) }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('longitudeCommune=2.347' ) }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codePostal=75006&ville=Paris&distanceCommune=10' ) }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('ville=Paris' ) }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('distanceCommune=10' ) }, undefined, { shallow: true });
		});
	});

	describe('lorsqu‘on recherche par métier mais pas par commune', () => {
		it('n‘effectue pas de recherche', async () => {
			// Given
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const aMetierList: Array<Metier> = [{
				label: 'Conduite de travaux, direction de chantier',
				romes: ['F1201', 'F1202', 'I1101'],
			}];

			const localisationService = aLocalisationService();
			const formationService = aFormationService(aRésultatFormation());
			const métierService = aMetierService(aMetierList);

			// When
			render(
				<DependenciesProvider
					formationService={formationService}
					metierService={métierService}
					localisationService={localisationService}>
					<FormulaireRechercherFormation/>
				</DependenciesProvider>,
			);

			const user = userEvent.setup();
			const inputMétiers = screen.getByRole('combobox', { name: /Domaine/i });
			await user.type(inputMétiers, 'boulang');
			await user.click(await screen.findByRole('option', { name: aListeDeMetierLaBonneAlternance()[0].label }));

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
			const aMetierList: Array<Metier> = [{
				label: 'Conduite de travaux, direction de chantier',
				romes: ['F1201', 'F1202', 'I1101'],
			}];

			const localisationService = aLocalisationService();
			const formationService = aFormationService(aRésultatFormation());
			const métierService = aMetierService(aMetierList);

			// When
			render(
				<DependenciesProvider
					formationService={formationService}
					metierService={métierService}
					localisationService={localisationService}>
					<FormulaireRechercherFormation/>
				</DependenciesProvider>,
			);

			const user = userEvent.setup();

			const comboboxCommune = screen.getByRole('combobox', { name: 'Localisation' });
			await user.type(comboboxCommune, 'Pari');
			const localisationsOptions = await screen.findAllByRole('option');
			await user.click(localisationsOptions[0]);

			const submitButton = screen.getByRole('button', { name: 'Rechercher' });
			await user.click(submitButton);

			// Then
			expect(routerPush).not.toHaveBeenCalled();
		});
	});

	describe('lorsqu‘on recherche par commune, métier et niveau d’études', () => {
		it('les informations de localisation, métier, et niveau d’études sont ajoutées à l‘url', async () => {
			// Given
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const aMetierList: Array<Metier> = [{
				label: 'Conduite de travaux, direction de chantier',
				romes: ['F1201', 'F1202', 'I1101'],
			}];

			const localisationService = aLocalisationService();
			const formationService = aFormationService(aRésultatFormation());
			const métierService = aMetierService(aMetierList);

			// When
			render(
				<DependenciesProvider
					formationService={formationService}
					metierService={métierService}
					localisationService={localisationService}>
					<FormulaireRechercherFormation/>
				</DependenciesProvider>,
			);

			const user = userEvent.setup();
			const inputMétiers = screen.getByRole('combobox', { name: /Domaine/i });
			await user.type(inputMétiers, 'boulang');
			await user.click(await screen.findByRole('option', { name: aListeDeMetierLaBonneAlternance()[0].label }));

			const comboboxCommune = screen.getByRole('combobox', { name: 'Localisation' });
			await user.type(comboboxCommune, 'Pari');
			const localisationOptions = await screen.findAllByRole('option');
			await user.click(localisationOptions[0]);

			const selectNiveauEtudes = screen.getByRole('button', { name: 'Niveau d’études visé (facultatif)' });
			await user.click(selectNiveauEtudes);

			const niveauEtudesList = await screen.findByRole('listbox');
			const inputNiveauEtudes = within(niveauEtudesList).getAllByRole('radio');
			await user.click(inputNiveauEtudes[0]);

			const submitButton = screen.getByRole('button', { name: 'Rechercher' });
			await user.click(submitButton);


			// Then
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('libelleMetier=Conduite+de+travaux%2C+direction+de+chantier') }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codeRomes=F1201%2CF1202%2CI1101') }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('libelleCommune=Paris+%2875006%29') }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codeCommune=75056') }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('latitudeCommune=48.859') }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('longitudeCommune=2.347') }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codePostal=75006') }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('ville=Paris') }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('distanceCommune=10') }, undefined, { shallow: true });
			expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('niveauEtudes=3') }, undefined, { shallow: true });
		});
	});

	it('rempli automatiquement les champs lorsque les query params sont présents', async () => {
		const query = {
			codeRomes: 'D1102,D1104',
			distanceCommune: '10',
			libelleMetier: 'Boulangerie, pâtisserie, chocolaterie',
			niveauEtudes: '4',
			...aCommuneQuery({
				codeCommune: '75056',
				latitudeCommune: '48.859',
				libelleCommune: 'Paris (75001)',
				longitudeCommune: '2.347',
			}),
		};
		mockUseRouter({ query });

		render(
			<DependenciesProvider metierService={aMetierService()} localisationService={aLocalisationService()}>
				<FormulaireRechercherFormation/>
			</DependenciesProvider>,
		);

		const domaine = screen.getByRole('combobox', { name: /Domaine/i });
		expect(domaine).toHaveValue('Boulangerie, pâtisserie, chocolaterie');
		const localisation = await screen.findByRole('combobox', { name: /Localisation/i });
		expect(localisation).toHaveValue('Paris (75001)');
		const rayon = screen.getByRole('button', { hidden: true, name: /Rayon/i });
		expect(rayon).toHaveTextContent('10');
		const niveau = screen.getByRole('button', { name: /Niveau d’études visé/i });
		expect(niveau).toHaveTextContent('Bac, autres formations niveau 4');
		const formulaireRechercheFormation = screen.getByRole('form');
		expect(formulaireRechercheFormation).toHaveFormValues(query);
	});

	it('laisse le champ domaine vide quand il manque les codes romes dans les query params', () => {
		const query = {
			libelleMetier: 'Boulangerie, pâtisserie, chocolaterie',
		};
		mockUseRouter({ query });

		render(
			<DependenciesProvider metierService={aMetierService()} localisationService={aLocalisationService()}>
				<FormulaireRechercherFormation/>
			</DependenciesProvider>,
		);

		const domaine = screen.getByRole('combobox', { name: /Domaine/i });
		expect(domaine).toHaveValue('');
		const form = screen.getByRole('form');
		expect(form).not.toHaveFormValues({
			codeRomes: expect.anything(),
			libelleMetier: expect.anything(),
		});
	});

	it('laisse le champ domaine vide quand il manque le libellé dans les query params', () => {
		const query = {
			codeRomes: 'D1102,D1104',
		};
		mockUseRouter({ query });

		render(
			<DependenciesProvider metierService={aMetierService()} localisationService={aLocalisationService()}>
				<FormulaireRechercherFormation/>
			</DependenciesProvider>,
		);

		const domaine = screen.getByRole('combobox', { name: /Domaine/i });
		expect(domaine).toHaveValue('');
		const form = screen.getByRole('form');
		expect(form).not.toHaveFormValues({
			codeRomes: expect.anything(),
			libelleMetier: expect.anything(),
		});
	});
});
