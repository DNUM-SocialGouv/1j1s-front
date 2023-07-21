import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { createSuccess, Either, isFailure } from '~/server/errors/either';
import { FormationInitialeRepository } from '~/server/formations-initiales/domain/formationInitiale.repository';
import { FormationInitialeDetailComplete } from '~/server/formations-initiales-detail/domain/formationInitiale';

export class ConsulterDetailFormationInitialeUseCase {
	constructor(private readonly formationInitialeRepository: FormationInitialeRepository, private readonly cmsRepository: CmsRepository) {
	}

	async handle(id: string): Promise<Either<FormationInitialeDetailComplete>> {
		const formationInitialeDetail = await this.formationInitialeRepository.getDetail(id);
		const formationInitialeDetailCMS = await this.cmsRepository.getFormationInitialeById(id);

		if (isFailure(formationInitialeDetail) || isFailure(formationInitialeDetailCMS)) {
			return formationInitialeDetail;
		}

		return createSuccess({ ...formationInitialeDetail.result, ...formationInitialeDetailCMS.result });
	}
}
