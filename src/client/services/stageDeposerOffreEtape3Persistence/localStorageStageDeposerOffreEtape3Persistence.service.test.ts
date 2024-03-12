/**
 * @jest-environment jsdom
 */

import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';
import { mockLocalStorage } from '~/client/components/window.mock';
import {
	LocalStorageStageDeposerOffreEtape3PersistenceService,
} from '~/client/services/stageDeposerOffreEtape3Persistence/localStorageStageDeposerOffreEtape3Persistence.service';

describe('LocalStorageStageDeposerOffreEtape3PersistenceService', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});
	describe('setInformationsEtape3', () => {
		it('envoie les informations dans le localStorage', () => {
			// Given
			mockLocalStorage({
				setItem: jest.fn(),
			});
			const service = new LocalStorageStageDeposerOffreEtape3PersistenceService();
			const informations: OffreDeStageDeposee.Localisation = {
				adresse: 'adresse',
				codePostal: '75000',
				departement: 'Paris',
				pays: 'France',
				region: 'Ile-de-France',
				ville: 'Paris',
			};

			// When
			service.setInformationsEtape3(informations);

			// Then
			expect(localStorage.setItem).toHaveBeenCalledWith('formulaireEtape3', JSON.stringify(informations));
		});
	});

	describe('getInformationsEtape2', () => {
		it('récupère les informations du sessionStorage', () => {
			// Given
			mockLocalStorage({
				getItem: jest.fn(),
			});
			const service = new LocalStorageStageDeposerOffreEtape3PersistenceService();

			// When
			service.getInformationsEtape3();

			// Then
			expect(localStorage.getItem).toHaveBeenCalledWith('formulaireEtape3');
		});
	});
});
