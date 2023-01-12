import { OffreDeStageAttributesFromCMS } from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import { CmsIndexRepository } from '~/server/cms/domain/cmsIndex.repository';
import { Either } from '~/server/errors/either';

export class ConsulterOffreStageUseCase {
	constructor(private cmsIndexRepository: CmsIndexRepository) {}

	async handle(slug: string): Promise<Either<OffreDeStageAttributesFromCMS>> {
		return this.cmsIndexRepository.getOffreDeStageBySlug(slug);
	}
}
