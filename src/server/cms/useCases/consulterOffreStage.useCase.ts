import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { OffreDeStage } from '~/server/cms/domain/offreDeStage.type';
import { Either } from '~/server/errors/either';

export class ConsulterOffreStageUseCase {
	constructor(private cmsRepository: CmsRepository) {}

	async handle(slug: string): Promise<Either<OffreDeStage>> {
		return this.cmsRepository.getOffreDeStageBySlug(slug);
	}
}
