/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Localisation
	from '~/client/components/features/OffreDeStage/Déposer/Étape3Localisation/StageDeposerOffreFormulaireÉtape3Localisation';
import {
	aFormulaireEtapeEntreprise,
	aFormulaireEtapeStage,
} from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre.fixture';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLocalStorage, mockSessionStorage } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aStageService } from '~/client/services/stage/stageService.fixture';
import { createFailure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';

describe('<Localisation />', () => {
	const mockLocalStorageGetItem = jest.fn();
	const mockSessionStorageGetItem = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		mockUseRouter({});
		mockLocalStorage({ getItem: mockLocalStorageGetItem });
		mockSessionStorage({ getItem: mockSessionStorageGetItem });
	});


	describe('quand l’étape 1 n’est pas remplie', () => {
		it('redirige vers l’étape 1 du formulaire', async () => {
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const stageService = aStageService();
			mockLocalStorageGetItem.mockReturnValue(null);

			render(
				<DependenciesProvider stageService={stageService}>
					<Localisation/>
				</DependenciesProvider>,
			);

			expect(routerPush).toHaveBeenCalledWith('/stages/deposer-offre');
		});
	});

	describe('quand l’étape 2 n’est pas remplie', () => {
		it('redirige vers l’étape 1 du formulaire', async () => {
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const stageService = aStageService();
			mockLocalStorageGetItem.mockReturnValue(JSON.stringify(aFormulaireEtapeEntreprise()));
			mockSessionStorageGetItem.mockReturnValue(null);

			render(
				<DependenciesProvider stageService={stageService}>
					<Localisation/>
				</DependenciesProvider>,
			);

			expect(routerPush).toHaveBeenCalledWith('/stages/deposer-offre');
		});
	});

	describe('quand l’étape 1 et 2 sont remplies', () => {
		beforeEach(() => {
		});

		it('il peut cliquer sur le bouton Retour pour retourner vers l’étape 2', async () => {
			const stageService = aStageService();
			mockLocalStorageGetItem.mockReturnValue(JSON.stringify(aFormulaireEtapeEntreprise()));
			mockSessionStorageGetItem.mockReturnValue(JSON.stringify(aFormulaireEtapeStage()));

			render(
				<DependenciesProvider stageService={stageService}>
					<Localisation/>
				</DependenciesProvider>,
			);

			const retourLink = screen.getByRole('link', { name: 'Retour à l’étape précédente' });

			expect(retourLink).toHaveAttribute('href', '/stages/deposer-offre/votre-offre-de-stage');
		});

		it('affiche la troisième étape de formulaire', () => {
			const stageService = aStageService();
			mockLocalStorageGetItem.mockReturnValue(JSON.stringify(aFormulaireEtapeEntreprise()));
			mockSessionStorageGetItem.mockReturnValue(JSON.stringify(aFormulaireEtapeStage()));

			render(
				<DependenciesProvider stageService={stageService}>
					<Localisation/>
				</DependenciesProvider>,
			);

			expect(screen.getByText('Étape 3 sur 3 : Localisation du stage')).toBeInTheDocument();
			expect(screen.getByLabelText('Pays')).toBeInTheDocument();
			expect(screen.getByLabelText('Ville')).toBeInTheDocument();
			expect(screen.getByLabelText('Adresse')).toBeInTheDocument();
			expect(screen.getByLabelText('Code postal')).toBeInTheDocument();
			expect(screen.getByLabelText('Région')).toBeInTheDocument();
			expect(screen.getByLabelText('Département')).toBeInTheDocument();
			expect(screen.getByRole('button', { name: 'Envoyer ma demande de dépôt d’offre' })).toBeInTheDocument();
		});

		it('il voit affiché des champs facultatifs', async () => {
			const labelRegion = 'Région';
			const labelDepartement = 'Département';
			const stageService = aStageService();
			mockLocalStorageGetItem.mockReturnValue(JSON.stringify(aFormulaireEtapeEntreprise()));
			mockSessionStorageGetItem.mockReturnValue(JSON.stringify(aFormulaireEtapeStage()));

			render(
				<DependenciesProvider stageService={stageService}>
					<Localisation/>
				</DependenciesProvider>,
			);

			await userEvent.type(screen.getByLabelText(labelRegion), 's{backspace}');
			await userEvent.type(screen.getByLabelText(labelDepartement), 's{backspace}');

			expect(screen.getByLabelText(labelRegion)).toBeValid();
			expect(screen.getByLabelText(labelDepartement)).toBeValid();
		});

		it('le bouton de soumission est désactivé et affiche "Envoi en cours" pendant la soumission du formulaire', async () => {
			// GIVEN
			mockSessionStorageGetItem.mockReturnValue(JSON.stringify(aFormulaireEtapeStage()));
			mockLocalStorageGetItem.mockReturnValue(JSON.stringify(aFormulaireEtapeEntreprise()));

			const user = userEvent.setup();
			const stageService = aStageService();
			jest.spyOn(stageService, 'enregistrerOffreDeStage').mockResolvedValue(new Promise(() => {})),

			render(
				<DependenciesProvider stageService={stageService}>
					<Localisation/>
				</DependenciesProvider>,
			);

			await remplirFormulaireEtape3();

			// WHEN
			await user.click(screen.getByRole('button', { name: 'Envoyer ma demande de dépôt d’offre' }));

			// THEN
			const loadingSubmitButton = screen.getByRole('button', { name: 'Envoi en cours' });
			expect(loadingSubmitButton).toBeVisible();
			expect(loadingSubmitButton).toBeDisabled();
		});

		describe('modale d‘erreur', () => {
			it('lorsque la soumission est en erreur, ouvre la modale d‘erreur', async () => {
				mockSessionStorageGetItem.mockReturnValue(JSON.stringify(aFormulaireEtapeStage()));
				mockLocalStorageGetItem.mockReturnValue(JSON.stringify(aFormulaireEtapeEntreprise()));

				const user = userEvent.setup();
				const stageService = aStageService({ enregistrerOffreDeStage: jest.fn() });
				jest.spyOn(stageService, 'enregistrerOffreDeStage').mockResolvedValue(createFailure(ErreurMetier.CONTENU_INDISPONIBLE)),

				render(
					<DependenciesProvider stageService={stageService}>
						<Localisation/>
					</DependenciesProvider>,
				);

				await remplirFormulaireEtape3();

				await user.click(screen.getByRole('button', { name: 'Envoyer ma demande de dépôt d’offre' }));

				expect(screen.getByRole('dialog', { name: 'Une erreur est survenue lors de l‘envoi du formulaire' })).toBeVisible();
			});

			it('lorsque je ferme la modale d‘erreur avec le bouton Fermer', async () => {
				mockSessionStorageGetItem.mockReturnValue(JSON.stringify(aFormulaireEtapeStage()));
				mockLocalStorageGetItem.mockReturnValue(JSON.stringify(aFormulaireEtapeEntreprise()));

				const user = userEvent.setup();
				const stageService = aStageService({ enregistrerOffreDeStage: jest.fn() });
				jest.spyOn(stageService, 'enregistrerOffreDeStage').mockResolvedValue(createFailure(ErreurMetier.CONTENU_INDISPONIBLE)),

				render(
					<DependenciesProvider stageService={stageService}>
						<Localisation/>
					</DependenciesProvider>,
				);

				await remplirFormulaireEtape3();

				await user.click(screen.getByRole('button', { name: 'Envoyer ma demande de dépôt d’offre' }));

				const modaleErreur = screen.getByRole('dialog', { name: 'Une erreur est survenue lors de l‘envoi du formulaire' });
				expect(modaleErreur).toBeVisible();
				await user.click(within(modaleErreur).getByRole('button', { name:'Fermer' }));

				expect(screen.getByText('Étape 3 sur 3 : Localisation du stage')).toBeVisible();
			});

			it('lorsque je ferme la modale d‘erreur avec le bouton Retour au formulaire', async () => {
				mockSessionStorageGetItem.mockReturnValue(JSON.stringify(aFormulaireEtapeStage()));
				mockLocalStorageGetItem.mockReturnValue(JSON.stringify(aFormulaireEtapeEntreprise()));

				const user = userEvent.setup();
				const stageService = aStageService({ enregistrerOffreDeStage: jest.fn() });
				jest.spyOn(stageService, 'enregistrerOffreDeStage').mockResolvedValue(createFailure(ErreurMetier.CONTENU_INDISPONIBLE)),

				render(
					<DependenciesProvider stageService={stageService}>
						<Localisation/>
					</DependenciesProvider>,
				);

				await remplirFormulaireEtape3();

				await user.click(screen.getByRole('button', { name: 'Envoyer ma demande de dépôt d’offre' }));

				const modaleErreur = screen.getByRole('dialog', { name: 'Une erreur est survenue lors de l‘envoi du formulaire' });
				expect(modaleErreur).toBeVisible();
				await user.click(within(modaleErreur).getByRole('button', { name:'Retour au formulaire' }));

				expect(screen.getByText('Étape 3 sur 3 : Localisation du stage')).toBeVisible();
			});
		});
	});
});

async function remplirFormulaireEtape3() {
	const user = userEvent.setup();
	await user.type(screen.getByRole('textbox', { name: 'Pays' }), 'France');
	await user.click(screen.getByRole('option', { name: 'France' }));
	await user.type(screen.getByRole('textbox', { name: 'Ville' }), 'Toulon');
	await user.type(screen.getByRole('textbox', { name: 'Adresse' }), 'rue de la faim');
	await user.type(screen.getByRole('textbox', { name: 'Code postal' }), '83000');
}
