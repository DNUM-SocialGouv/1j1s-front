/**
 * @jest-environment jsdom
 */

import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';
import { mockLocalStorage } from '~/client/components/window.mock';

import { LocalStorageStageDeposerOffreEtape1PersistenceService } from './localStorageStageDeposerOffreEtape1Persistence.service';

describe('LocalStorageStageDeposerOffreEtape1PersistenceService', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});
	describe('setInformationsEtape1', () => {
		it('envoie les informations dans le localStorage', () => {
			// Given
			mockLocalStorage({
				setItem: jest.fn(),
			});
			const service = new LocalStorageStageDeposerOffreEtape1PersistenceService();
			const informations: OffreDeStageDeposee.Entreprise = {
				descriptionEmployeur: 'descriptionEmployeur',
				emailEmployeur: 'emailEmployeur',
				logoEmployeur: 'logoEmployeur',
				nomEmployeur: 'nomEmployeur',
				siteEmployeur: 'siteEmployeur',
			};

			// When
			service.setInformationsEtape1(informations);

			// Then
			expect(localStorage.setItem).toHaveBeenCalledWith('formulaireEtape1', JSON.stringify(informations));
		});
	});

	describe('getInformationsEtape1', () => {
		it('récupère les informations du localStorage', () => {
			// Given
			mockLocalStorage({
				getItem: jest.fn(),
			});
			const service = new LocalStorageStageDeposerOffreEtape1PersistenceService();

			// When
			service.getInformationsEtape1();

			// Then
			expect(localStorage.getItem).toHaveBeenCalledWith('formulaireEtape1');
		});
	});
});
