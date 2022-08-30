import { CarteMesuresJeunes, MesuresJeunes } from '~/server/cms/domain/mesuresJeunes';
import {
  MesuresJeunesAttributesResponse,
  StrapiSingleTypeResponse,
} from '~/server/cms/infra/repositories/strapi.response';
import { Strapi } from '~/server/services/cms/infra/repositories/responses/cmsResponse';

export function aCarteMesuresJeunes(override?: Partial<CarteMesuresJeunes>): CarteMesuresJeunes {
  return {
    bannière: {
      alt: 'text',
      url: 'https://animage.jpg',
    },
    contenu: 'Un beau contenu de carte',
    titre: 'Un titre de carte',
    url: 'Une belle url de carte',
    ...override,
  };
}

export function aDeuxièmeCarteMesuresJeunes(override?: Partial<CarteMesuresJeunes>): CarteMesuresJeunes {
  return {
    bannière: {
      alt: 'text',
      url: 'https://animage.jpg',
    },
    contenu: 'Un deuxième beau contenu de carte',
    titre: 'Un deuxième titre de carte',
    url: 'Une deuxième belle url de carte',
    ...override,
  };
}

export function aTroisièmeCarteMesuresJeunes(override?: Partial<CarteMesuresJeunes>): CarteMesuresJeunes {
  return {
    bannière: {
      alt: 'text',
      url: 'https://animage.jpg',
    },
    contenu: 'Un troisième beau contenu de carte',
    titre: 'Un troisième titre de carte',
    url: 'Une troisième belle url de carte',
    ...override,
  };
}

export function aQuatrièmeCarteMesuresJeunes(override?: Partial<CarteMesuresJeunes>): CarteMesuresJeunes {
  return {
    bannière: {
      alt: 'text',
      url: 'https://animage.jpg',
    },
    contenu: 'Un quatrième beau contenu de carte',
    titre: 'Un quatrième titre de carte',
    url: 'Une quatrième belle url de carte',
    ...override,
  };
}

export function aCartesMesuresJeunesList(): CarteMesuresJeunes[] {
  return [aCarteMesuresJeunes(), aDeuxièmeCarteMesuresJeunes(), aTroisièmeCarteMesuresJeunes(), aQuatrièmeCarteMesuresJeunes()];
}

export function aMesuresJeunes(): MesuresJeunes {
  return {
    accompagnement: aCartesMesuresJeunesList(),
    aidesFinancières:  aCartesMesuresJeunesList(),
    orienterFormer:  aCartesMesuresJeunesList(),
    vieProfessionnelle:  aCartesMesuresJeunesList(),
  };
}

function aStrapiImage(): Strapi.ImageAttributes {
  return {
    alternativeText: 'text', createdAt: '', ext: '', hash: '', height: 0, mime: '', name: '', size: 0, updatedAt: '', url: 'https://animage.jpg', width: 0,
  };
}

function aStrapiResponseImage(): Strapi.Image {
  return {
    data: {
      attributes: aStrapiImage(),
    },
  };
}

export function aMesuresJeunesResponse(override?: Partial<StrapiSingleTypeResponse<MesuresJeunesAttributesResponse>>): StrapiSingleTypeResponse<MesuresJeunesAttributesResponse> {
  return {
    data: {
      attributes: {
        accompagnement: [
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un beau contenu de carte',
            titre: 'Un titre de carte',
            url: 'Une belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un deuxième beau contenu de carte',
            titre: 'Un deuxième titre de carte',
            url: 'Une deuxième belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un troisième beau contenu de carte',
            titre: 'Un troisième titre de carte',
            url: 'Une troisième belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un quatrième beau contenu de carte',
            titre: 'Un quatrième titre de carte',
            url: 'Une quatrième belle url de carte',
          },
        ],
        aidesFinancieres: [
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un beau contenu de carte',
            titre: 'Un titre de carte',
            url: 'Une belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un deuxième beau contenu de carte',
            titre: 'Un deuxième titre de carte',
            url: 'Une deuxième belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un troisième beau contenu de carte',
            titre: 'Un troisième titre de carte',
            url: 'Une troisième belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un quatrième beau contenu de carte',
            titre: 'Un quatrième titre de carte',
            url: 'Une quatrième belle url de carte',
          },
        ],
        orienterFormer: [
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un beau contenu de carte',
            titre: 'Un titre de carte',
            url: 'Une belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un deuxième beau contenu de carte',
            titre: 'Un deuxième titre de carte',
            url: 'Une deuxième belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un troisième beau contenu de carte',
            titre: 'Un troisième titre de carte',
            url: 'Une troisième belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un quatrième beau contenu de carte',
            titre: 'Un quatrième titre de carte',
            url: 'Une quatrième belle url de carte',
          },
        ],
        vieProfessionnelle: [
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un beau contenu de carte',
            titre: 'Un titre de carte',
            url: 'Une belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un deuxième beau contenu de carte',
            titre: 'Un deuxième titre de carte',
            url: 'Une deuxième belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un troisième beau contenu de carte',
            titre: 'Un troisième titre de carte',
            url: 'Une troisième belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un quatrième beau contenu de carte',
            titre: 'Un quatrième titre de carte',
            url: 'Une quatrième belle url de carte',
          },
        ],
      },
    },
    ...override,
  };
}
