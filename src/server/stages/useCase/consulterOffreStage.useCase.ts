import { Either } from '~/server/errors/either';
import { OffreDeStage } from '~/server/stages/domain/stages';
import { StagesRepository } from '~/server/stages/domain/stages.repository';

export class ConsulterOffreStageUseCase {
	constructor(private stagesRepository: StagesRepository) {}

	async handle(slug: string): Promise<Either<OffreDeStage>> {
		return this.stagesRepository.getOffreDeStageBySlug(slug);
	}
}
