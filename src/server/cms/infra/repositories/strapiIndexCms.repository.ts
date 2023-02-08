import { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { AnnonceDeLogement, AnnonceDeLogementResponse } from '~/server/cms/domain/annonceDeLogement.type';
import { CmsIndexRepository } from '~/server/cms/domain/cmsIndex.repository';
import {
	DomaineStageDepot,
	EmployeurDepotStage,
	LocalisationDepotStageIndexée,
	OffreDeStage, OffreDeStageDepot,
	OffreDeStageResponse,
	SourceDesDonnées,
} from '~/server/cms/domain/offreDeStage.type';
import { mapAnnonceLogement, mapOffreStage } from '~/server/cms/infra/repositories/strapi.mapper';
import { handleFailureError } from '~/server/cms/infra/repositories/strapiCmsError';
import { createSuccess, Either } from '~/server/errors/either';
import { HttpClientService } from '~/server/services/http/httpClientService';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';

export interface OffreDeStageDepotStrapi {
	identifiantSource: string
	publishedAt: null
	titre: string
	dateDeDebut: string
	description: string
	urlDeCandidature: string
	domaines: DomaineStageDepot[] | null
	dureeEnJour: number | null
	localisation: LocalisationDepotStageIndexée
	employeur: EmployeurDepotStage,
	remunerationBase: number | null
	source?: SourceDesDonnées
	teletravailPossible: boolean | null
}

export class StrapiIndexCmsRepository implements CmsIndexRepository {
	constructor(
		private httpClientService: HttpClientService,
		private authenticatedHttpClientService: HttpClientServiceWithAuthentification,
	) {
	}

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
		const offreStrapi = mapEnregistrerOffreDeStage(offre);
		return this.save<OffreDeStageDepotStrapi, void>(`${process.env.STRAPI_OFFRE_DE_STAGE_DEPOT_ENDPOINT}`, offreStrapi);
	}

	private async save<Body, Response = undefined>(resource: string, body: Body): Promise<Either<Response>> {
		try {
			const { data } = await this.authenticatedHttpClientService.post<{ data: Body }, Response>(resource, { data: body });
			return createSuccess(data);
		} catch (e) {
			return handleFailureError(e, resource);
		}
	}
}

export function mapEnregistrerOffreDeStage(body: OffreDeStageDepot): OffreDeStageDepotStrapi {
	return {
		dateDeDebut: body.dateDeDebut,
		description: body.description,
		domaines: body.domaine ? [{
			nom: body.domaine,
		}] as DomaineStageDepot[] : [],
		dureeEnJour: Number(body.duree),
		employeur: {
			description: body.employeur.description,
			email: body.employeur.email,
			logoUrl: body.employeur.logoUrl || null,
			nom: body.employeur.nom,
			siteUrl: body.employeur.siteUrl || null,
		} as EmployeurDepotStage,
		identifiantSource: uuidv4(),
		localisation: {
			adresse: body.localisation.adresse,
			codePostal: body.localisation.codePostal,
			departement: body.localisation.departement || null,
			pays: body.localisation.pays,
			region: body.localisation.region || null,
			ville: body.localisation.ville,
		} as LocalisationDepotStageIndexée,
		//Ajoute l'offre en 'draft' dans le CMS
		publishedAt: null,
		
		remunerationBase: body.remunerationBase ?? null,
		
		source: SourceDesDonnées.INTERNE,
		
		teletravailPossible: body.teletravailPossible ?? null,
		
		titre: body.titre,
		
		urlDeCandidature: body.urlDeCandidature,

	};
}
