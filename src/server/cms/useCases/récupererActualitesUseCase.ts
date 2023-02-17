import { Actualite } from '~/server/cms/domain/actualite';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { Either } from '~/server/errors/either';

export class RécupererActualitesUseCase {
	constructor(private cmsRepository: CmsRepository) {}

	async handle(): Promise<Either<Actualite[]>> {
		return this.cmsRepository.getActualitéList();
	}
}
