import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { createSuccess, Either, isFailure } from '~/server/errors/either';
import { FormationInitialeRepository } from '~/server/formations-initiales/domain/formationInitiale.repository';
import { FormationInitialeDetailComplete } from '~/server/formations-initiales-detail/domain/formationInitiale';

export class ConsulterDetailFormationInitialeUseCase {
	constructor(private readonly formationInitialeRepository: FormationInitialeRepository, private readonly cmsRepository: CmsRepository) {
	}

	async handle(id: string): Promise<Either<FormationInitialeDetailComplete>> {
		const formationInitiale = await this.formationInitialeRepository.getFormationInitiale(id);
		const detailsFormationInitiale = await this.cmsRepository.getFormationInitialeById(id);

		if (isFailure(formationInitiale) || isFailure(detailsFormationInitiale)) {
			return formationInitiale;
		}

		return createSuccess({ ...formationInitiale.result, ...detailsFormationInitiale.result });
	}
}
