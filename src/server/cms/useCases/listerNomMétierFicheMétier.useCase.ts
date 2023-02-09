import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { Either } from '~/server/errors/either';

export class ListerNomMétierFicheMétierUseCase {
	constructor(private cmsRepository: CmsRepository) {}

	handle(): Promise<Either<Array<string>>> {
		return this.cmsRepository.listAllFicheMetierNomMetier();
	}
}
