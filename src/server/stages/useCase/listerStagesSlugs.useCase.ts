import { Either } from '~/server/errors/either';

import { StagesRepository } from '../domain/stages.repository';

export class ListerStagesSlugsUseCase {
	constructor(private stagesRepository: StagesRepository) {
	}

	handle(): Promise<Either<Array<string>>> {
		return this.stagesRepository.listAllOffreDeStageSlug();
	}
}
