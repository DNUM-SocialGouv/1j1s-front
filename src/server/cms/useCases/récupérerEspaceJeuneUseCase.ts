import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { EspaceJeune } from '~/server/cms/domain/espaceJeune';
import { Either } from '~/server/errors/either';

export class RécupérerEspaceJeuneUseCase {
	constructor(private cmsRepository: CmsRepository) {}

	async handle(): Promise<Either<EspaceJeune>> {
		return this.cmsRepository.getEspaceJeune();
	}
}
