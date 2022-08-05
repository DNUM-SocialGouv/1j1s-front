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
    contenu: '<p>Un beau contenu de carte</p>\n',
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
    contenu: '<p>Un deuxième beau contenu de carte</p>\n',
    titre: 'Un deuxième titre de carte',
    url: 'Une deuxième belle url de carte',
    ...override,
  };
}

export function aCartesMesuresJeunesList(): CarteMesuresJeunes[] {
  return [aCarteMesuresJeunes(), aDeuxièmeCarteMesuresJeunes()];
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
        ],
      },
    },
    ...override,
  };
}
