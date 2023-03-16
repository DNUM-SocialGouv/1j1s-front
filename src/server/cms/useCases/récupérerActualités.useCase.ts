import { Actualité } from '~/server/cms/domain/actualité';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { Either } from '~/server/errors/either';

export class RécupérerActualitésUseCase {
	constructor(private cmsRepository: CmsRepository) {}

	async handle(): Promise<Either<Actualité[]>> {
		return this.cmsRepository.getActualitéList();
	}
}
