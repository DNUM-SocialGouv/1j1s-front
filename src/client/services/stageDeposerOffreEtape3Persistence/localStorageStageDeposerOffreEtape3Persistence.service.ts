import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';
import { PersistanceService } from '~/client/services/persistance/persistance.service';

import { StageDeposerOffreEtape3PersistenceService } from './stageDeposerOffreEtape3Persistence.service';

export class LocalStorageStageDeposerOffreEtape3PersistenceService implements StageDeposerOffreEtape3PersistenceService {
	private static STORAGE_KEY = 'formulaireEtape3';
	constructor(private storage: PersistanceService) {}

	getInformationsEtape3(): OffreDeStageDeposee.Localisation | null {
		return this.storage.get(LocalStorageStageDeposerOffreEtape3PersistenceService.STORAGE_KEY);
	}

	setInformationsEtape3(informations: OffreDeStageDeposee.Localisation): void {
		this.storage.set(LocalStorageStageDeposerOffreEtape3PersistenceService.STORAGE_KEY, informations);
	}
}
