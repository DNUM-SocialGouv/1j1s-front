import { StrapiRepository } from '~/server/cms/infra/repositories/strapi.repository';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';
import { Either } from '~/server/errors/either';

import { FormationInitialeDetailCMS } from '../domain/formationInitiale.type';
import { FormationInitialeDetailRepository } from '../domain/formationInitialeDetail.repository';
import { mapFormationInitiale } from './formationInitialeDetail.mapper';

export const RESSOURCE_FORMATION_INITIALE= 'formation-initiale-details';
export class StrapiFormationInitialeDetailRepository implements FormationInitialeDetailRepository {
	constructor(private readonly strapiService: StrapiRepository) {}

	async getFormationInitialeById(identifiant: string): Promise<Either<FormationInitialeDetailCMS>> {
		const query = `filters[identifiant][$eq]=${identifiant}`;
		const strapiResponse = this.strapiService.getFirstFromCollectionType<Strapi.CollectionType.FormationInitialeDetail, FormationInitialeDetailCMS>(RESSOURCE_FORMATION_INITIALE, query, mapFormationInitiale);
	}


}
