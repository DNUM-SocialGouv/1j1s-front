import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { createSuccess, Either, isFailure, isSuccess } from '~/server/errors/either';
import { StrapiAnnonceDeLogement } from '~/server/logements/infra/strapiAnnonceDeLogement';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';

import { AnnonceDeLogement } from '../domain/annonceDeLogement';
import { AnnonceDeLogementRepository } from '../domain/annonceDeLogement.repository';
import { mapAnnonceLogement } from './strapiAnnonceDeLogement.mapper';

const RESOURCE_ANNONCE_DE_LOGEMENT = 'annonces-de-logement';

export class StrapiAnnonceDeLogementRepository implements AnnonceDeLogementRepository {
	constructor(private strapiService: CmsRepository, private errorManagementService: ErrorManagementService) {
	}

	async getAnnonceDeLogementBySlug(slug: string): Promise<Either<AnnonceDeLogement>> {
		const query = `filters[slug][$eq]=${slug}`;
		const strapiAnnonceDeLogement = await this.strapiService.getFirstFromCollectionType<StrapiAnnonceDeLogement>(RESOURCE_ANNONCE_DE_LOGEMENT, query);

		if (isFailure(strapiAnnonceDeLogement)) {
			return strapiAnnonceDeLogement;
		}

		try {
			const annonceDeLogement = mapAnnonceLogement(strapiAnnonceDeLogement.result);
			return createSuccess(annonceDeLogement);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'Strapi - annonce de logement', contexte: 'consulter détail', message: 'impossible de mapper vers une annonce de logement',
			});
		}
	}

	async listAllAnnonceDeLogementSlug(): Promise<Either<Array<string>>> {
		const query = 'fields[0]=slug';
		const allStrapiAnnoncesDeLogements = await this.strapiService.getCollectionType<StrapiAnnonceDeLogement>(RESOURCE_ANNONCE_DE_LOGEMENT, query);
		if (isSuccess(allStrapiAnnoncesDeLogements)) {
			const slugs = allStrapiAnnoncesDeLogements.result.map((strapiAnnonceDeLogement) => strapiAnnonceDeLogement.slug);
			return createSuccess(slugs);
		}
		return allStrapiAnnoncesDeLogements;
	}
}
