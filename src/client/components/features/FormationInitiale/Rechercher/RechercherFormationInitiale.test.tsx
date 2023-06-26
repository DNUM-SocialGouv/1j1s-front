/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import {
	RechercherFormationInitiale,
} from '~/client/components/features/FormationInitiale/Rechercher/RechercherFormationInitiale';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import {
	aFormationInitialeService,
	aResultatListFormationInitiale,
} from '~/client/services/formationInitiale/formationInitiale.service.fixture';
import { createSuccess } from '~/server/errors/either';

describe('RechercherFormationInitiale', () => {
	beforeEach(() => {
		mockSmallScreen();
	});
	describe('Lorsque je fais une recherche de formation iniitale', () => {
		beforeEach(() => {
			mockUseRouter({
				query: {
					domaine: 'boulanger',
				},
			});
		});
		it('appelle le service concerné', async () => {
			const aFormationService = aFormationInitialeService();

			const resultRechercheFormation = createSuccess([aResultatListFormationInitiale({ libelle: 'boulanger' }),
				aResultatListFormationInitiale({ libelle: 'patissier' })]);
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>);

			await screen.findByText(/[0-9]+ formations/);
			expect(aFormationService.rechercherFormationInitiale).toHaveBeenCalledTimes(1);
			expect(aFormationService.rechercherFormationInitiale).toHaveBeenCalledWith({ domaine: 'boulanger' });
		});
		it('lorsqu‘il y a plusieurs résultats je vois le nombre de résultats affiché', async () => {
			const aFormationService = aFormationInitialeService();

			const resultRechercheFormation = createSuccess([aResultatListFormationInitiale({ libelle: 'boulanger' }),
				aResultatListFormationInitiale({ libelle: 'patissier' })]);
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>,
			);

			expect(await screen.findByText(/[0-9]+ formations/)).toBeVisible();
		});
		it('lorsqu‘il n‘y a pas de résultat je ne vois le nombre de résultats affiché', async () => {
			const aFormationService = aFormationInitialeService();
			const resultRechercheFormation = createSuccess([]);
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>,
			);

			expect(screen.queryByText(/[0-9]+ formation(s)?/)).not.toBeInTheDocument();
		});
		it('lorsqu‘il y a un résultat je vois le nombre de résultats affiché au singulier', async () => {
			const aFormationService = aFormationInitialeService();
			const resultRechercheFormation = createSuccess([aResultatListFormationInitiale({ libelle: 'boulanger' })]);
			jest.spyOn(aFormationService, 'rechercherFormationInitiale').mockResolvedValue(resultRechercheFormation);

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>,
			);

			expect(await screen.findByText(/1 formation/)).toBeVisible();
		});
	});
	describe('footnote', () => {
		it('affiche la footnote des partenaires', () => {
			mockUseRouter({});
			const aFormationService = aFormationInitialeService();

			render(<DependenciesProvider formationInitialeService={aFormationService}>
				<RechercherFormationInitiale/>
			</DependenciesProvider>,
			);

			const CGULink = screen.getByRole('link', { name: 'liste disponible dans les CGU' });
			expect(CGULink).toBeVisible();
			expect(CGULink).toHaveAttribute('href','/cgu#3-services');
		});
	});
});
