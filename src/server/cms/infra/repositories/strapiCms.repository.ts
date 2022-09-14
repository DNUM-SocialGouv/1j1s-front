import { Article, ArticleSlug } from '~/server/cms/domain/article';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { MesuresJeunes } from '~/server/cms/domain/mesuresJeunes';
import {
  mapArticle, mapFicheMetier,
  mapMentionObligatoire,
  mapMesuresJeunes,
} from '~/server/cms/infra/repositories/strapi.mapper';
import {
  ArticleAttributesResponse,
  ArticleSimpleAttributesResponse,
  MesuresJeunesAttributesResponse,
  StrapiCollectionTypeResponse,
  StrapiSingleTypeResponse,
} from '~/server/cms/infra/repositories/strapi.response';
import { Either } from '~/server/errors/either';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { FicheMétierHttp } from '~/server/fiche-metier/infra/repositories/ficheMetierMeilisearch.response';
import { HttpClientService } from '~/server/services/http/httpClient.service';

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

  async getMesuresJeunes(): Promise<Either<MesuresJeunes>> {
    const contenuList = ['vieProfessionnelle', 'orienterFormer', 'accompagnement', 'aidesFinancieres'];

    return await this.httpClientService.get<StrapiSingleTypeResponse<MesuresJeunesAttributesResponse>, MesuresJeunes>(
      `mesure-jeune?${contenuList.map((contenu) => `populate[${contenu}][populate]=*&`)}`.replaceAll(',', ''),
      mapMesuresJeunes,
    );
  }
}
