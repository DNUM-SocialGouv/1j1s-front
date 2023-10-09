import { StrapiRepository } from '~/server/cms/infra/repositories/strapi.repository';
import { Either } from '~/server/errors/either';
import {
	StrapiFormationInitialeDetail,
} from '~/server/formations-initiales-detail/infra/strapiFormationInitialeDetail';

import { FormationInitialeDetailCMS } from '../domain/formationInitiale.type';
import { FormationInitialeDetailRepository } from '../domain/formationInitialeDetail.repository';
import { mapFormationInitiale } from './mapper/formationInitialeDetail.mapper';

export const RESSOURCE_FORMATION_INITIALE= 'formation-initiale-details';

export class StrapiFormationInitialeDetailRepository implements FormationInitialeDetailRepository {
	constructor(private readonly strapiService: StrapiRepository) {}

	async getFormationInitialeById(identifiant: string): Promise<Either<FormationInitialeDetailCMS>> {
		const query = `filters[identifiant][$eq]=${identifiant}`;
		return this.strapiService.getFirstFromCollectionType<StrapiFormationInitialeDetail, FormationInitialeDetailCMS>(RESSOURCE_FORMATION_INITIALE, query, mapFormationInitiale);
	}
}
