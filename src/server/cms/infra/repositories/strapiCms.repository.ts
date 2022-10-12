import qs from 'qs';

import { Article, ArticleSlug } from '~/server/cms/domain/article';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { EspaceJeune } from '~/server/cms/domain/espaceJeune';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import {
  mapArticle, mapFicheMetier,
  mapMentionObligatoire,
  mapMesuresEmployeurs,
  mapMesuresJeunes,
} from '~/server/cms/infra/repositories/strapi.mapper';
import {
  ArticleAttributesResponse,
  ArticleSimpleAttributesResponse,
  EspaceJeuneAttributesResponse,
  MesuresEmployeursAttributesResponse,
  StrapiCollectionTypeResponse,
  StrapiSingleTypeResponse,
} from '~/server/cms/infra/repositories/strapi.response';
import { Either } from '~/server/errors/either';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { FicheMétierHttp } from '~/server/fiche-metier/infra/repositories/ficheMetierMeilisearch.response';
import { HttpClientService } from '~/server/services/http/httpClient.service';

import { MesuresEmployeurs } from '../../domain/mesuresEmployeurs';

export class StrapiCmsRepository implements CmsRepository {
  constructor(private httpClientService: HttpClientService) {}

  async getArticleBySlug(slug: ArticleSlug): Promise<Either<Article>> {
    const filters = `[slug][$eq]=${slug}&populate[0]=banniere`;
    return await this.httpClientService.get<StrapiCollectionTypeResponse<ArticleAttributesResponse>, Article>(
      `articles?filters${filters}`,
      mapArticle,
    );
  }

  async getFicheMetierByNom(nom: string): Promise<Either<FicheMétier>> {
    const filters = `[nom_metier][$eq]=${encodeURIComponent(nom)}&populate=%2A`;
    return await this.httpClientService.get<StrapiCollectionTypeResponse<FicheMétierHttp>, FicheMétier>(
      `fiche-metiers?filters${filters}`,
      mapFicheMetier,
    );
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
    return await this.httpClientService.get<StrapiSingleTypeResponse<ArticleSimpleAttributesResponse>, Article>(
      `${getContentTypeApi(type)}${requestSuffix}`,
      mapMentionObligatoire,
    );
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
    return await this.httpClientService.get<StrapiSingleTypeResponse<EspaceJeuneAttributesResponse>, EspaceJeune>(
      `mesure-jeune?${qs.stringify(query, { encode: false })}`,
      mapMesuresJeunes,
    );
  }

  async getMesuresEmployeurs(): Promise<Either<MesuresEmployeurs>> {
    const query = {
      populate: {
        dispositifs: {
          populate: '*',
        },
      },
    };
    return await this.httpClientService.get<StrapiSingleTypeResponse<MesuresEmployeursAttributesResponse>, MesuresEmployeurs>(
      `les-mesures-employeurs?${qs.stringify(query, { encode: false })}`,
      mapMesuresEmployeurs,
    );
  }
}
