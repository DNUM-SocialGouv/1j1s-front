import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';

import { StageDeposerOffreEtape1PersistenceService } from './stageDeposerOffreEtape1Persistence.service';

const STAGE_DEPOSER_OFFRE_ETAPE_1_KEY = 'formulaireEtape1';

export class LocalStorageStageDeposerOffreEtape1PersistenceService implements StageDeposerOffreEtape1PersistenceService {
	getInformationsEtape1(): OffreDeStageDeposee.Entreprise | null {
		const item = localStorage.getItem(STAGE_DEPOSER_OFFRE_ETAPE_1_KEY);
		return item ? JSON.parse(item) : null;
	}

	setInformationsEtape1(informations: OffreDeStageDeposee.Entreprise): void {
		localStorage.setItem(STAGE_DEPOSER_OFFRE_ETAPE_1_KEY, JSON.stringify(informations));
	}
}
