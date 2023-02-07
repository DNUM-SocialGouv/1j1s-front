import { Either } from '../../errors/either';
import { CmsRepository } from '../domain/cms.repository';

export class ListerNomMétierFicheMétierUseCase {
	constructor(private cmsRepository: CmsRepository) {}

	handle(): Promise<Either<Array<string>>> {
		return this.cmsRepository.listFicheMetierNomMetier();
	}
}
