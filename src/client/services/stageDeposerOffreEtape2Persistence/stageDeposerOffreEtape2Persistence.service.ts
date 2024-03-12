import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';

export interface StageDeposerOffreEtape2PersistenceService {
	getInformationsEtape2: () => OffreDeStageDeposee.Stage | null;
	setInformationsEtape2: (informations: OffreDeStageDeposee.Stage) => void;
	removeInformationsEtape2: () => void;
}
