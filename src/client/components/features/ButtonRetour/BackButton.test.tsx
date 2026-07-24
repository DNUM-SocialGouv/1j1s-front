import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { hydrateRoot, Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

import { BackButton } from '~/client/components/features/ButtonRetour/BackButton';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSessionStorage } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { StorageService } from '~/client/services/storage/storage.service';
import { aStorageService } from '~/client/services/storage/storage.service.fixture';

describe('BackButton', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe('Lorsque la variable IS_PREVIOUS_PAGE_LOCAL est définie dans le sessionStorage', () => {
		it('affiche le bouton de retour avec le role link', () => {
			// Given
			mockUseRouter({});
			mockSessionStorage({
				getItem: vi.fn().mockReturnValue('/page-1'),
			});

			// When
			render(<DependenciesProvider sessionStorageService={aStorageService({ get: vi.fn().mockReturnValue(true) })}><BackButton /></DependenciesProvider>);

			// Then
			expect(screen.getByRole('link', { name: 'Retour vers la page précédente' })).toBeInTheDocument();
		});
	});
	describe('Lorsque la variable IS_PREVIOUS_PAGE_LOCAL n’est pas définie dans le sessionStorage', () => {
		it('n’affiche pas le bouton de retour', () => {
			// Given
			mockUseRouter({});
			mockSessionStorage({
				getItem: vi.fn().mockReturnValue(null),
			});

			// When
			render(<DependenciesProvider sessionStorageService={aStorageService()}><BackButton /></DependenciesProvider>);

			// Then
			expect(screen.queryByRole('link', { name: 'Retour vers la page précédente' })).not.toBeInTheDocument();
		});
	});
	describe('Lorsque le HTML rendu par le serveur est hydraté par le client', () => {
		it('n’émet aucune erreur d’hydratation React', async () => {
			// Given
			mockUseRouter({});
			mockSessionStorage({
				getItem: vi.fn().mockReturnValue('true'),
			});
			// React signale un désappariement d’hydratation par un console.error, que le setup global
			// transforme en exception : sans ce silence, l’échec ne viendrait pas de l’assertion.
			vi.spyOn(console, 'error').mockImplementation(function ignoreLesAvertissementsReact() {});

			function arbre(sessionStorageService: StorageService) {
				return (
					<DependenciesProvider sessionStorageService={sessionStorageService}>
						<BackButton />
					</DependenciesProvider>
				);
			}

			const sessionStorageIndisponible = aStorageService({
				get: vi.fn(function leverCommeCoteServeur(): never {
					throw new Error('sessionStorage is not defined');
				}),
			});
			const conteneur = document.createElement('div');
			conteneur.innerHTML = renderToString(arbre(sessionStorageIndisponible));
			document.body.appendChild(conteneur);

			// When
			const onRecoverableError = vi.fn();
			let racine: Root;
			// La reprise après désappariement est planifiée : l’act doit englober l’hydratation
			// pour la vider avant l’assertion.
			await act(async function hydraterLeHtmlDuServeur() {
				racine = hydrateRoot(
					conteneur,
					arbre(aStorageService({ get: vi.fn().mockReturnValue(true) })),
					{ onRecoverableError },
				);
			});

			// Then
			expect(onRecoverableError).not.toHaveBeenCalled();

			await act(async function demonterLaRacineHydratee() {
				racine.unmount();
			});
			conteneur.remove();
		});
	});
});
