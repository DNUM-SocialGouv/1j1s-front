import { AxiosResponse } from 'axios';

import {
	AnnonceDeLogement,
	AnnonceDeLogementResponse,
} from '~/client/components/features/Logement/AnnonceDeLogement.type';
import {
	OffreDeStageAttributesFromCMS,
	OffreDeStageInternalService,
} from '~/client/components/features/OffreDeStage/OffreDeStage.type';
import { CmsIndexRepository } from '~/server/cms/domain/cmsIndex.repository';
import {
	mapAnnonceLogement,
	mapOffreStage,
} from '~/server/cms/infra/repositories/strapi.mapper';
import { handleFailureError } from '~/server/cms/infra/repositories/strapiCmsError';
import { createSuccess, Either } from '~/server/errors/either';
import { HttpClientService } from '~/server/services/http/httpClientService';

export class StrapiIndexCmsRepository implements CmsIndexRepository {
	constructor(
		private httpClientService: HttpClientService,
	) {}

	async getOffreDeStageBySlug(slug: string): Promise<Either<OffreDeStageAttributesFromCMS>> {
		return this.getResource<OffreDeStageInternalService, OffreDeStageAttributesFromCMS>(`slugify/slugs/offre-de-stage/${slug}?populate=deep`, mapOffreStage, 'offre stage');
	}

	async getAnnonceDeLogementBySlug(slug: string): Promise<Either<AnnonceDeLogement>> {
		return this.getResource<AnnonceDeLogementResponse, AnnonceDeLogement>(`slugify/slugs/annonce-de-logement/${slug}?populate=deep`, mapAnnonceLogement, 'annonce logement');
	}

	async getResource<ApiResponseType, ResponseType>(endpoint: string, mapper: (data: ApiResponseType) => ResponseType, content: string): Promise<Either<ResponseType>> {
		try {
			const { data }: AxiosResponse = await this.httpClientService.get(endpoint);
			return createSuccess(mapper(data));
		} catch (e) {
			return handleFailureError(e, content);
		}
	}

}
