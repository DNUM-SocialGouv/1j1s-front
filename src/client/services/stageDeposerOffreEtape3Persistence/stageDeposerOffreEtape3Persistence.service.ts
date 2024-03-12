import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';

export interface StageDeposerOffreEtape3PersistenceService {
	getInformationsEtape3: () => OffreDeStageDeposee.Localisation | null;
	setInformationsEtape3: (informations: OffreDeStageDeposee.Localisation) => void;
}
