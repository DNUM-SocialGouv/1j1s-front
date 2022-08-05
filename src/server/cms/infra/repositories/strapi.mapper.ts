import { Article } from '~/server/cms/domain/article';
import { Image } from '~/server/cms/domain/image';
import { CarteMesuresJeunes, MesuresJeunes } from '~/server/cms/domain/mesuresJeunes';
import {
  ArticleAttributesResponse,
  ArticleSimpleAttributesResponse,
  CarteMesuresJeunesResponse,
  MesuresJeunesAttributesResponse,
  StrapiCollectionTypeResponse,
  StrapiImage,
  StrapiSingleTypeResponse,
} from '~/server/cms/infra/repositories/strapi.response';
import { parseMarkdown } from '~/server/services/utils/markdown.util';

export function mapPageFooter(response: StrapiSingleTypeResponse<ArticleSimpleAttributesResponse>): Article {
  const { contenu, titre } = response.data.attributes;
  return {
    bannière: undefined,
    contenu: parseMarkdown(contenu),
    slug: undefined,
    titre,
  };
}

export function mapArticle(articleResponse: StrapiCollectionTypeResponse<ArticleAttributesResponse>): Article {
  const { banniere, contenu, slug, titre } = articleResponse.data[0].attributes;

  return {
    bannière: mapImage(banniere),
    contenu: parseMarkdown(contenu || ''),
    slug,
    titre,
  };
}

export function mapMesuresJeunes(response: StrapiSingleTypeResponse<MesuresJeunesAttributesResponse>): MesuresJeunes {
  const { vieProfessionnelle, aidesFinancieres, accompagnement, orienterFormer } = response.data.attributes;

  const mapCartesMesuresJeuneList = (cartesMesuresJeunesList: CarteMesuresJeunesResponse[]): CarteMesuresJeunes[] => {
    return cartesMesuresJeunesList.map<CarteMesuresJeunes>((carteMesuresJeunes) => {
      const { banniere, contenu, titre, url } = carteMesuresJeunes;
      return {
        bannière: mapImage(banniere),
        contenu: parseMarkdown(contenu),
        titre,
        url,
      };
    });
  };

  return {
    accompagnement: mapCartesMesuresJeuneList(accompagnement),
    aidesFinancières: mapCartesMesuresJeuneList(aidesFinancieres),
    orienterFormer: mapCartesMesuresJeuneList(orienterFormer),
    vieProfessionnelle: mapCartesMesuresJeuneList(vieProfessionnelle),
  };
}

function mapImage(bannière: StrapiImage | undefined): Image | undefined {
  if(bannière) {
    const { alternativeText, url } = bannière.data.attributes;
    return {
      alt: alternativeText || '',
      url: url,
    };
  } else {
    return undefined;
  }
}
