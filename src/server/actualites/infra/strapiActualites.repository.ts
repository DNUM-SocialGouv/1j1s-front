import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { createSuccess, Either, isFailure } from '~/server/errors/either';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';

import { Actualité } from '../domain/actualite';
import { ActualitesRepository } from '../domain/actualites.repository';
import { StrapiListeActualites } from './strapiActualites';
import { mapStrapiListeActualites } from './strapiActualites.mapper';

const RESOURCE_ACTUALITE = 'actualite';

export class StrapiActualitesRepository implements ActualitesRepository {
	constructor(private readonly strapiService: CmsRepository, private readonly errorManagementService: ErrorManagementService) {
	}

	async getActualitesList(): Promise<Either<Array<Actualité>>> {
		const query = 'populate=deep';
		const strapiActualitesList = await this.strapiService.getSingleType<StrapiListeActualites.ListeActualites>(RESOURCE_ACTUALITE, query);

		if (isFailure(strapiActualitesList))
			return strapiActualitesList;

		try {
			const actualitesList = mapStrapiListeActualites(strapiActualitesList.result);
			return createSuccess(actualitesList);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'Strapi - Actualités',
				contexte: 'récupérer les actualités',
				message: 'impossible de mapper vers les actualités',
			});
		}
	}
}
