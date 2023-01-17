import { CmsIndexRepository } from '~/server/cms/domain/cmsIndex.repository';
import { OffreDeStage } from '~/server/cms/domain/offreDeStage.type';
import { Either } from '~/server/errors/either';

export class ConsulterOffreStageUseCase {
	constructor(private cmsIndexRepository: CmsIndexRepository) {}

	async handle(slug: string): Promise<Either<OffreDeStage>> {
		return this.cmsIndexRepository.getOffreDeStageBySlug(slug);
	}
}
