/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
	FormulaireRechercheStages3eme,
} from '~/client/components/features/Stages3eme/Rechercher/FormulaireRecherche/FormulaireRechercheStages3eme';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aCommuneQuery } from '~/client/hooks/useCommuneQuery';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { aMetierService } from '~/client/services/metiers/metier.fixture';
import { aStage3emeService } from '~/client/services/stage3eme/stage3eme.service.fixture';
import { createSuccess } from '~/server/errors/either';
import {
	aCommune,
	aRésultatsRechercheCommune,
} from '~/server/localisations/domain/localisationAvecCoordonnées.fixture';

describe('FormulaireRechercheStages3eme', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	it('quand la query comporte la localisation, ajoute la valeur correspondante dans l‘input', () => {
		const routerPush = jest.fn();

		mockUseRouter({
			push: routerPush, query: {
				...aCommuneQuery({
					codeCommune: '75056',
					codePostal: '75006',
					latitudeCommune: '48.859',
					libelleCommune: 'Paris (75006)',
					longitudeCommune: '2.347',
					ville: 'Paris',
				}),
				distanceCommune: '10',
			},
		});
		render(
			<DependenciesProvider
				localisationService={aLocalisationService()}
				stage3emeService={aStage3emeService()}
				metierStage3emeService={aMetierService()}
			>
				<FormulaireRechercheStages3eme/>
			</DependenciesProvider>,
		);

		const combobox = screen.getByRole('combobox', { name: 'Localisation' });
		expect(combobox).toBeVisible();
		expect(combobox).toHaveValue('Paris (75006)');
		expect(screen.getByDisplayValue('2.347')).toBeInTheDocument();
		expect(screen.getByDisplayValue('48.859')).toBeInTheDocument();
		expect(screen.getByDisplayValue('75056')).toBeInTheDocument();
	});

	it('quand on recherche par métier, ajoute le métier recherché aux query params', async () => {
		// GIVEN
		const routerPush = jest.fn();
		const user = userEvent.setup();

		mockUseRouter({
			push: routerPush, query: {
				...aCommuneQuery({
					codeCommune: '75056',
					codePostal: '75006',
					latitudeCommune: '48.859',
					libelleCommune: 'Paris (75006)',
					longitudeCommune: '2.347',
					ville: 'Paris',
				}),
				distanceCommune: '10',
			},
		});
		const metierService = aMetierService();
		jest.spyOn(metierService, 'rechercherMetier').mockResolvedValue(createSuccess([
			{ code: 'codeMetier', label: 'boulanger' },
		]));
		const localisationService = aLocalisationService();

		render(
			<DependenciesProvider
				localisationService={localisationService}
				stage3emeService={aStage3emeService()}
				metierStage3emeService={metierService}
			>
				<FormulaireRechercheStages3eme/>
			</DependenciesProvider>,
		);

		// WHEN
		const inputRechercheMetier = screen.getByRole('combobox', { name: 'Métier (facultatif)' });
		await user.type(inputRechercheMetier, 'boulanger');
		const boulangerOption = await screen.findByRole('option', { name: 'boulanger' });
		await user.click(boulangerOption);
		const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
		await user.click(buttonRechercher);

		// THEN
		expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('libelleMetier=boulanger&codeMetier=codeMetier') }, undefined, { shallow: true });
	});

	it('quand on recherche par localisation, ajoute la localisation aux query params', async () => {
		const routerPush = jest.fn();
		const user = userEvent.setup();
		mockUseRouter({ push: routerPush });

		const localisationService = aLocalisationService();
		const commune = aCommune({
			libelle: 'Paris (75006)',
		});

		jest.spyOn(localisationService, 'rechercherCommune').mockResolvedValue(createSuccess(aRésultatsRechercheCommune([commune])));
		render(
			<DependenciesProvider
				stage3emeService={aStage3emeService()}
				metierStage3emeService={aMetierService()}
				localisationService={localisationService}
			>
				<FormulaireRechercheStages3eme/>
			</DependenciesProvider>,
		);

		// WHEN
		const comboboxLocalisation = screen.getByRole('combobox', { name: 'Localisation' });
		await user.type(comboboxLocalisation, 'Paris');

		const boulangerOption = await screen.findByRole('option', { name: 'Paris (75006)' });
		await user.click(boulangerOption);

		const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
		await user.click(buttonRechercher);

		expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('libelleCommune=Paris+%2875006%29') }, undefined, { shallow: true });
		expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codeCommune=75056') }, undefined, { shallow: true });
		expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('latitudeCommune=48.859&longitudeCommune=2.347') }, undefined, { shallow: true });
		expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('codePostal=75006') }, undefined, { shallow: true });
		expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('ville=Paris') }, undefined, { shallow: true });
		expect(routerPush).toHaveBeenCalledWith({ query: expect.stringContaining('distanceCommune=10') }, undefined, { shallow: true });
	});

	it('ne lance pas la recherche si la localisation n‘est pas présente', async () => {
		mockUseRouter({});
		const user = userEvent.setup();
		const stage3emeService = aStage3emeService();
		render(
			<DependenciesProvider
				stage3emeService={stage3emeService}
				metierStage3emeService={aMetierService()}
				localisationService={aLocalisationService()}
			>
				<FormulaireRechercheStages3eme/>
			</DependenciesProvider>,
		);

		const buttonRechercher = screen.getByRole('button', { name: 'Rechercher' });
		await user.click(buttonRechercher);
		
		expect(stage3emeService.rechercherStage3eme).not.toHaveBeenCalled();
	});
});
