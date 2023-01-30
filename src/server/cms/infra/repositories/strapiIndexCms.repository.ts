import { AxiosResponse } from 'axios';

import {
	AnnonceDeLogement,
	AnnonceDeLogementResponse,
} from '~/server/cms/domain/annonceDeLogement.type';
import { CmsIndexRepository } from '~/server/cms/domain/cmsIndex.repository';
import {
	OffreDeStage, OffreDeStageDepot,
	OffreDeStageResponse,
} from '~/server/cms/domain/offreDeStage.type';
import {
	mapAnnonceLogement,
	mapOffreStage,
} from '~/server/cms/infra/repositories/strapi.mapper';
import { handleFailureError } from '~/server/cms/infra/repositories/strapiCmsError';
import { createSuccess, Either } from '~/server/errors/either';
import { HttpClientService } from '~/server/services/http/httpClientService';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';

export class StrapiIndexCmsRepository implements CmsIndexRepository {
	constructor(
		private httpClientService: HttpClientService,
		private authenticatedHttpClientService: HttpClientServiceWithAuthentification,
	) {}

	async getOffreDeStageBySlug(slug: string): Promise<Either<OffreDeStage>> {
		return this.getResource<OffreDeStageResponse, OffreDeStage>(`slugify/slugs/${process.env.STRAPI_OFFRE_DE_STAGE_ENDPOINT}/${slug}?populate=deep`, mapOffreStage, 'offre stage');
	}

	async getAnnonceDeLogementBySlug(slug: string): Promise<Either<AnnonceDeLogement>> {
		return this.getResource<AnnonceDeLogementResponse, AnnonceDeLogement>(`slugify/slugs/${process.env.STRAPI_ANNONCE_DE_LOGEMENT_ENDPOINT}/${slug}?populate=deep`, mapAnnonceLogement, 'annonce logement');
	}

	async getResource<ApiResponseType, ResponseType>(endpoint: string, mapper: (data: ApiResponseType) => ResponseType, content: string): Promise<Either<ResponseType>> {
		try {
			const { data }: AxiosResponse = await this.httpClientService.get(endpoint);
			return createSuccess(mapper(data.data.attributes));
		} catch (e) {
			return handleFailureError(e, content);
		}
	}

	async saveOffreDeStage(offre: OffreDeStageDepot): Promise<Either<void>> {
		return this.save<OffreDeStageDepot, void>(`${process.env.STRAPI_OFFRE_DE_STAGE_ENDPOINT}`, offre);
	}

	async save<Body, Response = undefined>(resource: string, body: Body): Promise<Either<Response>> {
		try {
			const { data } = await this.authenticatedHttpClientService.post<{ data: Body }, Response>(resource, { data: body });
			return createSuccess(data);
		} catch (e) {
			return handleFailureError(e, resource);
		}
	}
}
