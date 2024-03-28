import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';

import { StageDeposerOffreEtape2PersistenceService } from './stageDeposerOffreEtape2Persistence.service';

const STAGE_DEPOSER_OFFRE_ETAPE_2_KEY = 'formulaireEtape2';

export class SessionStorageStageDeposerOffreEtape2PersistenceService implements StageDeposerOffreEtape2PersistenceService {
	getInformationsEtape2(): OffreDeStageDeposee.Stage | null {
		const item = sessionStorage.getItem(STAGE_DEPOSER_OFFRE_ETAPE_2_KEY);
		return item ? JSON.parse(item) : null;
	}

	setInformationsEtape2(informations: OffreDeStageDeposee.Stage): void {
		sessionStorage.setItem(STAGE_DEPOSER_OFFRE_ETAPE_2_KEY, JSON.stringify(informations));
	}

	removeInformationsEtape2(): void {
		sessionStorage.removeItem(STAGE_DEPOSER_OFFRE_ETAPE_2_KEY);
	}
}
