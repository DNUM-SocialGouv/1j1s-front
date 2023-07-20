import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { FormationInitialeDetailCMS } from '~/server/cms/domain/formationInitiale.type';
import { Either } from '~/server/errors/either';

export class ConsulterDetailFormationInitialeUseCase {
	constructor(private cmsRepository: CmsRepository) {}

	async handle(slug: string): Promise<Either<FormationInitialeDetailCMS>> {
		return this.cmsRepository.getFormationInitialeById(slug);
	}
}
