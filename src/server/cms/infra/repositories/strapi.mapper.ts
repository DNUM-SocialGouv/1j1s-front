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

export function mapMentionObligatoire(response: StrapiSingleTypeResponse<ArticleSimpleAttributesResponse>): Article {
  const { contenu, titre } = response.data.attributes;
  return {
    bannière: undefined,
    contenu,
    slug: undefined,
    titre,
  };
}

export function mapArticle(articleResponse: StrapiCollectionTypeResponse<ArticleAttributesResponse>): Article {
  const { banniere, contenu, slug, titre } = articleResponse.data[0].attributes;

  return {
    bannière: mapImage(banniere),
    contenu: contenu || '',
    slug,
    titre,
  };
}

export function mapMesuresJeunes(response: StrapiSingleTypeResponse<MesuresJeunesAttributesResponse>): MesuresJeunes {
  const { vieProfessionnelle, aidesFinancieres, accompagnement, orienterFormer } = response.data.attributes;

  return {
    accompagnement: mapCartesMesuresJeuneList(accompagnement),
    aidesFinancières: mapCartesMesuresJeuneList(aidesFinancieres),
    orienterFormer: mapCartesMesuresJeuneList(orienterFormer),
    vieProfessionnelle: mapCartesMesuresJeuneList(vieProfessionnelle),
  };
}

function mapCartesMesuresJeuneList(cartesMesuresJeunesList: CarteMesuresJeunesResponse[]): CarteMesuresJeunes[] {
  return cartesMesuresJeunesList.map<CarteMesuresJeunes>((carteMesuresJeunes) => {
    const { banniere, contenu, titre, url } = carteMesuresJeunes;
    return {
      bannière: mapImage(banniere),
      contenu: contenu,
      titre,
      url,
    };
  });
}

export function mapImage(bannière: StrapiImage | undefined): Image | undefined {
  if(bannière?.data) {
    const { alternativeText, url } = bannière.data.attributes;
    return {
      alt: alternativeText || '',
      url: url,
    };
  } else {
    return undefined;
  }
}
