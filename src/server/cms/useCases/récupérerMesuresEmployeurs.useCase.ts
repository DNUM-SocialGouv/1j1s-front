import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { MesureEmployeur } from '~/server/cms/domain/mesureEmployeur';
import { Either } from '~/server/errors/either';

export class RécupérerMesuresEmployeursUseCase {
	constructor(private cmsRepository: CmsRepository) {}

	async handle(): Promise<Either<MesureEmployeur[]>> {
		return this.cmsRepository.getMesuresEmployeurs();
	}
}

