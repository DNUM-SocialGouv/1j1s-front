import { OffreDeStageDeposee } from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre';
import { Either } from '~/server/errors/either';

export interface StageService {
	enregistrerOffreDeStage(informationsEntreprise: OffreDeStageDeposee.Entreprise, informationsStage: OffreDeStageDeposee.Stage, informationsLocalisation: OffreDeStageDeposee.Localisation): Promise<Either<void>>
}

