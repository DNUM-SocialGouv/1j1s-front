/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
	FormulaireRechercheAlternance,
} from '~/client/components/features/Alternance/Rechercher/FormulaireRecherche/FormulaireRechercheAlternance';
import { MetierOption } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/MetierOption';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aCommuneQuery } from '~/client/hooks/useCommuneQuery';
import { anAlternanceService } from '~/client/services/alternance/alternance.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { aMetierOption, aMetierService } from '~/client/services/metiers/metier.fixture';
import { aResultatRechercherMultipleAlternance } from '~/server/alternances/domain/alternance.fixture';
import { createSuccess } from '~/server/errors/either';
import { aListeDeMetierLaBonneAlternance } from '~/server/metiers/domain/métier.fixture';

describe('FormulaireRechercheAlternance', () => {
	beforeEach(() => {
		mockSmallScreen();
	});
	describe('quand le composant est affiché sans recherche', () => {
		it('affiche un formulaire pour la recherche d‘alternance, sans échantillon de résultat', async () => {
			// GIVEN
			const alternanceService = anAlternanceService();
			const localisationService = aLocalisationService();
			mockUseRouter({});

			// WHEN
			render(
				<DependenciesProvider
					alternanceService={alternanceService}
					localisationService={localisationService}
					metierLbaService={aMetierService()}
				>
					<FormulaireRechercheAlternance/>
				</DependenciesProvider>,
			);
			const formulaireRechercheAlternance = screen.getByRole('form');

			// THEN
			expect(formulaireRechercheAlternance).toBeInTheDocument();
			expect(alternanceService.rechercherAlternance).toHaveBeenCalledTimes(0);
		});
		it('lorsque je séléctionne une commune, affiche le champ rayon', async () => {
			render(
				<DependenciesProvider
					alternanceService={anAlternanceService()}
					localisationService={aLocalisationService()}
					metierLbaService={aMetierService()}
				>
					<FormulaireRechercheAlternance/>
				</DependenciesProvider>,
			);

			const user = userEvent.setup();

			const comboboxCommune = screen.getByRole('combobox', { name: 'Localisation' });
			await user.type(comboboxCommune, 'Pari');
			const localisationOptions = await screen.findAllByRole('option');
			await user.click(localisationOptions[0]);

			expect(screen.getByRole('button', { name: 'Rayon' })).toBeVisible();
		});
	});

	describe('lorsqu‘on recherche par localisation et par métier', () => {
		it('les informations de la localisatione et du métier sont ajoutées à l’url', async () => {
			// Given
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const aMetierList: Array<MetierOption> = [aMetierOption({
				code: 'F1201,F1202,I1101',
				label: 'Conduite de travaux, direction de chantier',
			})];

			const localisationService = aLocalisationService();
			const alternanceService = anAlternanceService(aResultatRechercherMultipleAlternance().offreList, aResultatRechercherMultipleAlternance().entrepriseList);
			const metierService = aMetierService();
			jest.spyOn(metierService, 'rechercherMetier').mockResolvedValue(createSuccess(aMetierList));
			// When
			render(
				<DependenciesProvider
					alternanceService={alternanceService}
					localisationService={localisationService}
					metierLbaService={metierService}
				>
					<FormulaireRechercheAlternance/>
				</DependenciesProvider>,
			);

			const user = userEvent.setup();
			const inputMetiers = screen.getByRole('combobox', { name: 'Domaine' });
			await user.type(inputMetiers, 'boulang');
			const firstMetierOption = await screen.findByRole('option', { name: aListeDeMetierLaBonneAlternance()[0].label });
			await user.click(firstMetierOption);


			const comboboxCommune = screen.getByRole('combobox', { name: 'Localisation' });
			await user.type(comboboxCommune, 'Pari');
			const localisationOptions = await screen.findAllByRole('option');
			await user.click(localisationOptions[0]);

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
		});
	});

	describe('lorsqu‘on recherche par métier mais pas par commune', () => {
		it('n‘effectue pas de recherche', async () => {
			// Given
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const aMetierList: Array<MetierOption> = [aMetierOption({
				code: 'F1201,F1202,I1101',
				label: 'Conduite de travaux, direction de chantier',
			})];

			const localisationService = aLocalisationService();
			const alternanceService = anAlternanceService(aResultatRechercherMultipleAlternance().offreList, aResultatRechercherMultipleAlternance().entrepriseList);
			const metierService = aMetierService();
			jest.spyOn(metierService, 'rechercherMetier').mockResolvedValue(createSuccess(aMetierList));
			// When
			render(
				<DependenciesProvider
					alternanceService={alternanceService}
					localisationService={localisationService}
					metierLbaService={metierService}
				>
					<FormulaireRechercheAlternance/>
				</DependenciesProvider>,
			);

			const user = userEvent.setup();
			const inputMetiers = screen.getByRole('combobox', { name: 'Domaine' });
			await user.type(inputMetiers, 'boulang');
			const firstMetierOption = await screen.findByRole('option', { name: aListeDeMetierLaBonneAlternance()[0].label });
			await user.click(firstMetierOption);

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
			const aMetierList: Array<MetierOption> = [aMetierOption({
				code: 'F1201,F1202,I1101',
				label: 'Conduite de travaux, direction de chantier',
			})];

			const localisationService = aLocalisationService();
			const alternanceService = anAlternanceService(aResultatRechercherMultipleAlternance().offreList, aResultatRechercherMultipleAlternance().entrepriseList);
			const metierService = aMetierService();
			jest.spyOn(metierService, 'rechercherMetier').mockResolvedValue(createSuccess(aMetierList));
			// When
			render(
				<DependenciesProvider
					alternanceService={alternanceService}
					localisationService={localisationService}
					metierLbaService={metierService}
				>
					<FormulaireRechercheAlternance/>
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

	it('rempli automatiquement les champs lorsque les query params sont présents', () => {
		mockUseRouter({
			query: {
				codeRomes: 'D1102,D1104',
				distanceCommune: '10',
				libelleMetier: 'Boulangerie, pâtisserie, chocolaterie',
				...aCommuneQuery({
					codeCommune: '75056',
					latitudeCommune: '48.859',
					libelleCommune: 'Paris (75001)',
					longitudeCommune: '2.347',
				}),
			},
		});

		render(
			<DependenciesProvider localisationService={aLocalisationService()} metierLbaService={aMetierService()}>
				<FormulaireRechercheAlternance/>
			</DependenciesProvider>,
		);

		const inputMetiers = screen.getByRole('combobox', { name: 'Domaine' });
		expect(inputMetiers).toHaveValue('Boulangerie, pâtisserie, chocolaterie');
		const localisation = screen.getByRole('combobox', { name: 'Localisation' });
		expect(localisation).toHaveValue('Paris (75001)');
		const rayon = screen.getByTestId('Select-InputHidden');
		expect(rayon).toHaveValue('10');
	});

	it('laisse le champ domaine vide quand il manque les codes romes dans les query params', () => {
		mockUseRouter({
			query: {
				libelleMetier: 'Boulangerie, pâtisserie, chocolaterie',
			},
		});

		render(
			<DependenciesProvider localisationService={aLocalisationService()} metierLbaService={aMetierService()}>
				<FormulaireRechercheAlternance/>
			</DependenciesProvider>,
		);

		const inputMetiers = screen.getByRole('combobox', { name: 'Domaine' });
		expect(inputMetiers).toHaveValue('');
		const form = screen.getByRole('form');
		expect(form).not.toHaveFormValues({
			codeRomes: expect.anything(),
			libelleMetier: expect.anything(),
		});
	});
	it('laisse le champ domaine vide quand il manque le libellé dans les query params', () => {
		mockUseRouter({
			query: {
				codeRomes: 'D1102,D1104',
			},
		});

		render(
			<DependenciesProvider localisationService={aLocalisationService()} metierLbaService={aMetierService()}>
				<FormulaireRechercheAlternance/>
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
