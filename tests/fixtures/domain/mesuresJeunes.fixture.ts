import { CarteMesuresJeunes, MesuresJeunes } from '~/server/mesuresJeunes/domain/mesuresJeunes';
import { Strapi } from '~/server/mesuresJeunes/infra/repositories/apiStrapiMesuresJeunes.response';

export function aCarteMesuresJeunes(override?: Partial<CarteMesuresJeunes>): CarteMesuresJeunes {
  return {
    bannière: aStrapiImage(),
    contenu: '<p>Un beau contenu de carte</p>\n',
    titre: 'Un titre de carte',
    url: 'Une belle url de carte',
    ...override,
  };
}

export function aDeuxièmeCarteMesuresJeunes(override?: Partial<CarteMesuresJeunes>): CarteMesuresJeunes {
  return {
    bannière: aStrapiImage(),
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
    aidesFinancieres:  aCartesMesuresJeunesList(),
    orienterFormer:  aCartesMesuresJeunesList(),
    vieProfessionnelle:  aCartesMesuresJeunesList(),
  };
}

function aStrapiImage(): Strapi.ImageAttributes {
  return {
    createdAt: '', ext: '', hash: '', height: 0, mime: '', name: '', size: 0, updatedAt: '', url: '', width: 0,
  };
}

function aStrapiResponseImage(): Strapi.Image {
  return {
    data: {
      attributes: aStrapiImage(),
      id: 0 },
  };
}

export function aMesuresJeunesResponse(override?: Partial<Strapi.MesuresJeunesContentType>): Strapi.MesuresJeunesContentType {
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
        createdAt: '2022-06-02T15:49:22.086Z',
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
        publishedAt: '2022-06-02T15:49:50.642Z',
        updatedAt: '2022-06-02T15:49:50.645Z',
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
      id: 0,
    },
    meta: {
      pagination: {
        page: 1,
        pageCount: 1,
        pageSize: 25,
        total: 1,
      },
    },
    ...override,
  };
}
