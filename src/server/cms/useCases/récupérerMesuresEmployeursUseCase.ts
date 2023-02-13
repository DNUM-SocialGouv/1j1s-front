import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { CarteMesuresEmployeurs } from '~/server/cms/domain/mesuresEmployeurs';
import { Either } from '~/server/errors/either';

export class RécupérerMesuresEmployeursUseCase {
	constructor(private cmsRepository: CmsRepository) {}

	async handle(): Promise<Either<CarteMesuresEmployeurs[]>> {
		return this.cmsRepository.getMesuresEmployeurs();
	}
}

