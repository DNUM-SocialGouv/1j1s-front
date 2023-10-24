import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { createSuccess, Either, isSuccess } from '~/server/errors/either';
import {
	StrapiFormationInitialeDetail,
} from '~/server/formations-initiales-detail/infra/strapiFormationInitialeDetail';

import { FormationInitialeDetailCMS } from '../domain/formationInitiale.type';
import { FormationInitialeDetailRepository } from '../domain/formationInitialeDetail.repository';
import { mapFormationInitiale } from './mapper/formationInitialeDetail.mapper';

export const RESSOURCE_FORMATION_INITIALE= 'formation-initiale-details';

export class StrapiFormationInitialeDetailRepository implements FormationInitialeDetailRepository {
	constructor(private readonly strapiService: CmsRepository) {}

	async getFormationInitialeById(identifiant: string): Promise<Either<FormationInitialeDetailCMS>> {
		const query = `filters[identifiant][$eq]=${identifiant}`;
		const strapiFormationInitialeDetail = await this.strapiService.getFirstFromCollectionType<StrapiFormationInitialeDetail>(RESSOURCE_FORMATION_INITIALE, query);

		if (isSuccess(strapiFormationInitialeDetail))
			return createSuccess(mapFormationInitiale(strapiFormationInitialeDetail.result));

		return strapiFormationInitialeDetail;
	}
}
