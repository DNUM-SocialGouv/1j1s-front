import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';

export interface StageDeposerOffreEtape1PersistenceService {
	getInformationsEtape1: () => OffreDeStageDeposee.Entreprise | null;
	setInformationsEtape1: (informations: OffreDeStageDeposee.Entreprise) => void;
}
