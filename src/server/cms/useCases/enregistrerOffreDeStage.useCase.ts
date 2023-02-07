import { CmsIndexRepository } from '~/server/cms/domain/cmsIndex.repository';
import { OffreDeStageDepot } from '~/server/cms/domain/offreDeStage.type';

import { Either } from '../../errors/either';

export class enregistrerOffreDeStageUseCase {
	constructor(private cmsIndexRepository: CmsIndexRepository) {}

	async handle(offre: OffreDeStageDepot): Promise<Either<void>> {
		return this.cmsIndexRepository.saveOffreDeStage(offre);
	}
}
