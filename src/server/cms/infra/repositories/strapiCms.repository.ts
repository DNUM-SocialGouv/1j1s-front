import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

import { Article, ArticleSlug } from '~/server/cms/domain/article';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { EspaceJeune } from '~/server/cms/domain/espaceJeune';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import {
  mapArticle,
  mapEspaceJeune,
  mapFicheMetier,
  mapMentionObligatoire,
  mapMesuresEmployeurs,
} from '~/server/cms/infra/repositories/strapi.mapper';
import {
  ArticleAttributesResponse,
  ArticleSimpleAttributesResponse,
  EspaceJeuneAttributesResponse,
  MesuresEmployeursAttributesResponse,
  StrapiCollectionTypeResponse,
  StrapiSingleTypeResponse,
} from '~/server/cms/infra/repositories/strapi.response';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { FicheMétierHttp } from '~/server/fiche-metier/domain/ficheMetierHttp';
import { HttpClientService } from '~/server/services/http/httpClientService';
import { LoggerService } from '~/server/services/logger.service';

import { MesuresEmployeurs } from '../../domain/mesuresEmployeurs';

export class StrapiCmsRepository implements CmsRepository {
  constructor(private httpClientService: HttpClientService) {}

  async getArticleBySlug(slug: ArticleSlug): Promise<Either<Article>> {
    const filters = `[slug][$eq]=${slug}&populate[0]=banniere`;
    const endpoint = `articles?filters${filters}`;
    return this.getResource<StrapiCollectionTypeResponse<ArticleAttributesResponse>, Article>(endpoint, mapArticle);
  }

  async getFicheMetierByNom(nom: string): Promise<Either<FicheMétier>> {
    const filters = `[nom_metier][$eq]=${encodeURIComponent(nom)}&populate=%2A`;
    const endpoint = `fiche-metiers?filters${filters}`;
    return this.getResource<StrapiCollectionTypeResponse<FicheMétierHttp>, FicheMétier>(endpoint, mapFicheMetier);
  }

  async getMentionObligatoire(type: MentionsObligatoires): Promise<Either<Article>> {
    const requestSuffix = '?populate=*';
    const getContentTypeApi = (contenuType: MentionsObligatoires): string => {
      switch (contenuType) {
        case MentionsObligatoires.ACCESSIBILITE: return 'accessibilite';
        case MentionsObligatoires.CONDITIONS_GENERALES_UTILISATIONS: return 'conditions-generales-d-utilisation';
        case MentionsObligatoires.MENTIONS_LEGALES: return 'mention-legale';
        case MentionsObligatoires.POLITIQUES_CONFIDENTIALITES: return 'politique-de-confidentialite';
      }
    };
    const endpoint = `${getContentTypeApi(type)}${requestSuffix}`;
    return this.getResource<StrapiSingleTypeResponse<ArticleSimpleAttributesResponse>, Article>(endpoint, mapMentionObligatoire);
  }

  async getEspaceJeune(): Promise<Either<EspaceJeune>> {
    const query = {
      populate: {
        accompagnement: { populate: '*' },
        aidesFinancieres: { populate: '*' },
        orienterFormer: { populate: '*' },
        vieProfessionnelle: { populate: '*' },
      },
    };
    const endpoint = `mesure-jeune?${qs.stringify(query, { encode: false })}`;
    return this.getResource<StrapiSingleTypeResponse<EspaceJeuneAttributesResponse>, EspaceJeune>(endpoint, mapEspaceJeune);
  }

  async getMesuresEmployeurs(): Promise<Either<MesuresEmployeurs>> {
    const query = {
      populate: {
        dispositifs: {
          populate: '*',
        },
      },
    };
    const endpoint = `les-mesures-employeurs?${qs.stringify(query, { encode: false })}`;
    return this.getResource<StrapiSingleTypeResponse<MesuresEmployeursAttributesResponse>, MesuresEmployeurs>(endpoint, mapMesuresEmployeurs);
  }

  async getResource<ApiResponseType, ResponseType>(endpoint: string, mapper: (data: ApiResponseType) => ResponseType): Promise<Either<ResponseType>> {
    try {
      const { data }: AxiosResponse = await this.httpClientService.get(endpoint);
      return createSuccess(mapper(data));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 400:
            LoggerService.error('[API Strapi] 400 Bad request pour la ressource: ' + endpoint);
            return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
          case 401:
            LoggerService.error('[API Strapi] 401 Unauthorized');
            return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
          case 404:
            return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
          case 403:
            LoggerService.error('[API Strapi] 403 Forbidden pour la ressource: ' + endpoint);
            return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
          case 500:
            LoggerService.error('[API Strapi] 500 Internal server error');
            return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
        }
      }
      LoggerService.error('[API Strapi] Erreur inconnue - Impossible de récupérer la ressource: ' + endpoint);
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
  }
}
