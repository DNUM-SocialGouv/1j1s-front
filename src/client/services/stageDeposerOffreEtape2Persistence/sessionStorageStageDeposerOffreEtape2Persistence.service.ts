import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';
import { PersistanceService } from '~/client/services/persistance/persistance.service';

import { StageDeposerOffreEtape2PersistenceService } from './stageDeposerOffreEtape2Persistence.service';

export class SessionStorageStageDeposerOffreEtape2PersistenceService implements StageDeposerOffreEtape2PersistenceService {
	private static STORAGE_KEY = 'formulaireEtape2';
	constructor(private storage: PersistanceService) {}

	getInformationsEtape2(): OffreDeStageDeposee.Stage | null {
		return this.storage.get(SessionStorageStageDeposerOffreEtape2PersistenceService.STORAGE_KEY);
	}

	setInformationsEtape2(informations: OffreDeStageDeposee.Stage): void {
		this.storage.set(SessionStorageStageDeposerOffreEtape2PersistenceService.STORAGE_KEY, informations);
	}

	removeInformationsEtape2(): void {
		this.storage.remove(SessionStorageStageDeposerOffreEtape2PersistenceService.STORAGE_KEY);
	}
}
