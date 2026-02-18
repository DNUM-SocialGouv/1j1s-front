import { Either } from '~/server/errors/either';
import { OffreDeStageDepot } from '~/server/stages/domain/stages';
import { StagesRepository } from '~/server/stages/domain/stages.repository';

export class EnregistrerOffreDeStageUseCase {
	constructor(private stagesRepository: StagesRepository) {}

	async handle(offreDeStage: OffreDeStageDepot): Promise<Either<void>> {
		return this.stagesRepository.saveOffreDeStage(offreDeStage);
	}
}
