import { Either } from '~/server/errors/either';
import { OffreStageDepot } from '~/server/stages/domain/stages';
import { StagesRepository } from '~/server/stages/domain/stages.repository';
import OffreDeStageDepot = OffreStageDepot.OffreDeStageDepot;

export class EnregistrerOffreDeStageUseCase {
	constructor(private stagesRepository: StagesRepository) {}

	async handle(offreDeStage: OffreDeStageDepot): Promise<Either<void>> {
		return this.stagesRepository.saveOffreDeStage(offreDeStage);
	}
}
