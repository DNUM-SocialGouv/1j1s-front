import { CarteActualite } from '~/server/cms/domain/actualite';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { Either } from '~/server/errors/either';

export class RécupererActualitesUseCase {
	constructor(private cmsRepository: CmsRepository) {}

	async handle(): Promise<Either<CarteActualite[]>> {
		return this.cmsRepository.getActualitéList();
	}
}
