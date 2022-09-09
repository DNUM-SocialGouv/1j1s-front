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
import {
  FicheMétier,
  FicheMetierNestedField,
  FicheMetierNestedFieldStatut } from '~/server/fiche-metier/domain/ficheMetier';
import {
  FicheMétierHttp,
  FicheMétierHttpNestedField, FicheMétierHttpNestedFieldStatut,
} from '~/server/fiche-metier/infra/repositories/ficheMetierMeilisearch.response';

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

export function mapFicheMetier(ficheMetierResponse: StrapiCollectionTypeResponse<FicheMétierHttp>): FicheMétier {
  const ficheMetier = ficheMetierResponse.data[0].attributes;

  return {
    accesMetier: ficheMetier.acces_metier,
    accrocheMetier: ficheMetier.accroche_metier,
    centresInteret: ficheMetier.centres_interet && mapFicheMetierNestedFieldList(ficheMetier.centres_interet),
    competences: ficheMetier.competences,
    conditionTravail: ficheMetier.condition_travail,
    formationsMinRequise: ficheMetier.formations_min_requise && mapFicheMetierNestedFieldList(ficheMetier.formations_min_requise),
    id: ficheMetier.id,
    idOnisep: ficheMetier.identifiant,
    natureTravail: ficheMetier.nature_travail,
    niveauMinAcces: ficheMetier.niveau_min_acces && mapFicheMetierNestedFieldList(ficheMetier.niveau_min_acces),
    nomMetier: ficheMetier.nom_metier,
    secteursActivite: ficheMetier.secteurs_activite && mapFicheMetierNestedFieldList(ficheMetier.secteurs_activite),
    statuts: ficheMetier.statuts && mapFicheMetierNestedFieldStatutList(ficheMetier.statuts),
    vieProfessionnelle: ficheMetier.vie_professionnelle,
  };
}

function mapFicheMetierNestedFieldStatutList(nestedFieldStatutList: FicheMétierHttpNestedFieldStatut[]): FicheMetierNestedFieldStatut[] {
  return nestedFieldStatutList.map((field) => ({
    ...mapFicheMetierNestedField(field),
    idIdeo: field.id_ideo1,
  }));
}

function mapFicheMetierNestedFieldList(nestedFieldList: FicheMétierHttpNestedField[]): FicheMetierNestedField[] {
  return nestedFieldList.map((field) => mapFicheMetierNestedField(field));
}

function mapFicheMetierNestedField(nestedField: FicheMétierHttpNestedField): FicheMetierNestedField {
  return {
    id: nestedField.id,
    idOnisep: nestedField.identifiant,
    libelle: nestedField.libelle,
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
