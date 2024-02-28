/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import {
	aBackButtonPersistenceService,
} from '~/client/services/backButtonPersistence/backButtonPersistence.service.fixture';

describe('ConsulterOffreLayout', () => {
	describe('quand l’utilisateur clique sur le bouton retour', () => {
		describe('et qu’il vient de la page de recherche d’emploi sans paramètre', () => {
			it('doit retourner sur la page emploi sans paramètres', async () => {
				const routerBack = jest.fn();
				const user = userEvent.setup();
				const backButtonPersistenceService = aBackButtonPersistenceService({
					getPreviousPath: jest.fn().mockReturnValue('/emplois'),
				});
				mockUseRouter({
					back: routerBack,
					query: {
						from: '/emplois',
						params: '',
					},
				});
				render(<DependenciesProvider backButtonPersistenceService={backButtonPersistenceService}><ConsulterOffreLayout><></></ConsulterOffreLayout></DependenciesProvider>);

				await user.click(screen.getByRole('button', { name: 'Retour vers la page précédente' }));

				expect(routerBack).toHaveBeenCalled();
			});
		});

		describe('et qu’il vient de la page de recherche d’emploi avec des paramètres', () => {
			it('doit retourner sur la page emploi avec des paramètres', async () => {
				const routerBack = jest.fn();
				const user = userEvent.setup();

				const backButtonPersistenceService = aBackButtonPersistenceService({
					getPreviousPath: jest.fn().mockReturnValue('/emplois'),
				});
				mockUseRouter({
					back: routerBack,
					query: {
						from: '/emplois',
						params: 'typeDeContrats=CDD&tempsDeTravail=tempsPlein&experienceExigence=D&page=1',
					},
				});
				render(<DependenciesProvider backButtonPersistenceService={backButtonPersistenceService}><ConsulterOffreLayout><></></ConsulterOffreLayout></DependenciesProvider>);

				await user.click(screen.getByRole('button', { name: 'Retour vers la page précédente' }));

				expect(routerBack).toHaveBeenCalled();
			});
		});

		describe('quand il n’y a pas d’url de retour', () => {
			it('n’affiche pas le bouton de retour', () => {
				const routerBack = jest.fn();
				jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
				mockUseRouter({
					back: routerBack,
					query: {},
				});
				render(<DependenciesProvider backButtonPersistenceService={aBackButtonPersistenceService()}><ConsulterOffreLayout><></></ConsulterOffreLayout></DependenciesProvider>);

				expect(screen.queryByRole('button', { name: 'Retour vers la page' })).not.toBeInTheDocument();
			});
		});
	});
});
