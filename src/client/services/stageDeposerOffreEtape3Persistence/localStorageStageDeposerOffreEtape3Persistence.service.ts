import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';

import { StageDeposerOffreEtape3PersistenceService } from './stageDeposerOffreEtape3Persistence.service';

const STAGE_DEPOSER_OFFRE_ETAPE_3_KEY = 'formulaireEtape3';

export class LocalStorageStageDeposerOffreEtape3PersistenceService implements StageDeposerOffreEtape3PersistenceService {
	getInformationsEtape3(): OffreDeStageDeposee.Localisation | null {
		const item = localStorage.getItem(STAGE_DEPOSER_OFFRE_ETAPE_3_KEY);
		return item ? JSON.parse(item) : null;
	}

	setInformationsEtape3(informations: OffreDeStageDeposee.Localisation): void {
		localStorage.setItem(STAGE_DEPOSER_OFFRE_ETAPE_3_KEY, JSON.stringify(informations));
	}
}
