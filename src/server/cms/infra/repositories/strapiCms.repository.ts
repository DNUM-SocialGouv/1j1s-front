import { Article, ArticleSlug } from '~/server/cms/domain/article';
import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { MesuresJeunes } from '~/server/cms/domain/mesuresJeunes';
import { mapArticle, mapMentionObligatoire, mapMesuresJeunes } from '~/server/cms/infra/repositories/strapi.mapper';
import {
  ArticleAttributesResponse,
  ArticleSimpleAttributesResponse,
  MesuresJeunesAttributesResponse,
  StrapiCollectionTypeResponse,
  StrapiSingleTypeResponse,
} from '~/server/cms/infra/repositories/strapi.response';
import { Either } from '~/server/errors/either';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

export class StrapiCmsRepository implements CmsRepository {
  constructor(private strapiHttpClientService: StrapiHttpClientService) {}

  async getArticleBySlug(slug: ArticleSlug): Promise<Either<Article>> {
    const filters = `[slug][$eq]=${slug}&populate[0]=banniere`;
    return await this.strapiHttpClientService.get<StrapiCollectionTypeResponse<ArticleAttributesResponse>, Article>(
      `articles?filters${filters}`,
      mapArticle,
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
    return await this.strapiHttpClientService.get<StrapiSingleTypeResponse<ArticleSimpleAttributesResponse>, Article>(
      `${getContentTypeApi(type)}${requestSuffix}`,
      mapMentionObligatoire,
    );
  }

  async getMesuresJeunes(): Promise<Either<MesuresJeunes>> {
    const contenuList = ['vieProfessionnelle', 'orienterFormer', 'accompagnement', 'aidesFinancieres'];

    return await this.strapiHttpClientService.get<StrapiSingleTypeResponse<MesuresJeunesAttributesResponse>, MesuresJeunes>(
      `mesure-jeune?${contenuList.map((contenu) => `populate[${contenu}][populate]=*&`)}`.replaceAll(',', ''),
      mapMesuresJeunes,
    );
  }
}
