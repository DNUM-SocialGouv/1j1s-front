import { AxiosResponse } from 'axios';

import {
	AnnonceDeLogement,
	AnnonceDeLogementResponse,
} from '~/server/cms/domain/annonceDeLogement.type';
import { CmsIndexRepository } from '~/server/cms/domain/cmsIndex.repository';
import {
	OffreDeStage,
	OffreDeStageResponse,
} from '~/server/cms/domain/offreDeStage.type';
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

	async getOffreDeStageBySlug(slug: string): Promise<Either<OffreDeStage>> {
		return this.getResource<OffreDeStageResponse, OffreDeStage>(`slugify/slugs/${process.env.NEXT_PUBLIC_INDEX_OFFRE_DE_STAGE}/${slug}?populate=deep`, mapOffreStage, 'offre stage');
	}

	async getAnnonceDeLogementBySlug(slug: string): Promise<Either<AnnonceDeLogement>> {
		return this.getResource<AnnonceDeLogementResponse, AnnonceDeLogement>(`slugify/slugs/${process.env.NEXT_PUBLIC_INDEX_ANNONCE_DE_LOGEMENT}/${slug}?populate=deep`, mapAnnonceLogement, 'annonce logement');
	}

	async getResource<ApiResponseType, ResponseType>(endpoint: string, mapper: (data: ApiResponseType) => ResponseType, content: string): Promise<Either<ResponseType>> {
		try {
			const { data }: AxiosResponse = await this.httpClientService.get(endpoint);
			return createSuccess(mapper(data.data.attributes));
		} catch (e) {
			return handleFailureError(e, content);
		}
	}
}
