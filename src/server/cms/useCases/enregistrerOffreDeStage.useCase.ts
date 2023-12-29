import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { OffreDeStageDepot } from '~/server/cms/domain/offreDeStage.type';
import { Either } from '~/server/errors/either';

export class enregistrerOffreDeStageUseCase {
	constructor(private cmsRepository: CmsRepository) {}

	async handle(offre: OffreDeStageDepot): Promise<Either<void>> {
		console.log('dans handle usecase');
		return this.cmsRepository.saveOffreDeStage(offre);
	}
}
