/**
 * @jest-environment jsdom
 */

import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';
import { mockSessionStorage } from '~/client/components/window.mock';
import { DomainesStage } from '~/server/stages/repository/domainesStage';

import { SessionStorageStageDeposerOffreEtape2PersistenceService } from './sessionStorageStageDeposerOffreEtape2Persistence.service';

describe('SessionStorageStageDeposerOffreEtape2PersistenceService', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});
	describe('setInformationsEtape2', () => {
		it('envoie les informations dans le sessionStorage', () => {
			// Given
			mockSessionStorage({
				setItem: jest.fn(),
			});
			const service = new SessionStorageStageDeposerOffreEtape2PersistenceService();
			const informations: OffreDeStageDeposee.Stage = {
				dateDeDebutMax: '2022-01-01',
				dateDeDebutMin: '2022-01-01',
				descriptionOffre: 'description',
				domaineStage: DomainesStage.ACHAT,
				dureeStage: '1',
				isDateDeDebutPrecise: 'true',
				lienCandidature: 'lien',
				nomOffre: 'nom',
				remunerationStage: '1000',
				teletravail: 'true',
			};

			// When
			service.setInformationsEtape2(informations);

			// Then
			expect(sessionStorage.setItem).toHaveBeenCalledWith('formulaireEtape2', JSON.stringify(informations));
		});
	});

	describe('getInformationsEtape2', () => {
		it('récupère les informations du sessionStorage', () => {
			// Given
			mockSessionStorage({
				getItem: jest.fn(),
			});
			const service = new SessionStorageStageDeposerOffreEtape2PersistenceService();

			// When
			service.getInformationsEtape2();

			// Then
			expect(sessionStorage.getItem).toHaveBeenCalledWith('formulaireEtape2');
		});
	});

	describe('removeInformationsEtape2', () => {
		it('supprime les informations du sessionStorage', () => {
			// Given
			mockSessionStorage({
				removeItem: jest.fn(),
			});
			const service = new SessionStorageStageDeposerOffreEtape2PersistenceService();

			// When
			service.removeInformationsEtape2();

			// Then
			expect(sessionStorage.removeItem).toHaveBeenCalledWith('formulaireEtape2');
		});
	});
});
