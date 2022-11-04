import { aStrapiArticleResponse } from '@tests/fixtures/domain/espaceJeune.fixture';
import { strapiImageFixture } from '@tests/fixtures/server/cms/strapi.fixture';

import { CarteMesuresEmployeurs, MesuresEmployeurs } from '~/server/cms/domain/mesuresEmployeurs';
import {
  CarteMesuresEmployeursResponse,
  MesuresEmployeursAttributesResponse,
  StrapiSingleTypeResponse,
} from '~/server/cms/infra/repositories/strapi.response';

export function desMesuresEmployeurs(): MesuresEmployeurs {
  return {
    dispositifs: [aCarteMesuresEmployeurs()],
  };
}

export function aCarteMesuresEmployeurs(override?: Partial<CarteMesuresEmployeurs>): CarteMesuresEmployeurs {
  return {
    article: {
      contenu: 'Contenu',
      slug: 'slug-titre',
      titre: 'Titre',
    },
    bannière: {
      alt: 'text',
      url: 'https://animage.jpg',
    },
    contenu: 'Un beau contenu de carte',
    extraitContenu: 'Un beau contenu de carte',
    link: '/articles/slug-titre',
    pourQui: 'Ceci est pour tous ceux à qui ça s\'adresse',
    titre: 'Un titre de carte',
    url: 'https://some.example.com/1',
    ...override,
  };
}

export function aDeuxièmeCarteMesuresEmployeurs(override?: Partial<CarteMesuresEmployeurs>): CarteMesuresEmployeurs {
  return {
    article: {
      contenu: 'Contenu',
      slug: 'slug-article',
      titre: 'Titre',
    },
    bannière: {
      alt: 'text',
      url: 'https://animage.jpg',
    },
    contenu: 'Un deuxième beau contenu de carte',
    extraitContenu: 'Un deuxième beau contenu de carte',
    link: '/articles/slug-article',
    pourQui: 'Ceci est pour tous ceux à qui ça s\'adresse',
    titre: 'Un deuxième titre de carte',
    url: 'https://some.example.com/2',
    ...override,
  };
}

export function aTroisièmeCarteMesuresEmployeurs(override?: Partial<CarteMesuresEmployeurs>): CarteMesuresEmployeurs {
  return {
    article: {
      contenu: 'Contenu',
      slug: 'titre',
      titre: 'Titre',
    },
    bannière: {
      alt: 'text',
      url: 'https://animage.jpg',
    },
    contenu: 'Un troisième beau contenu de carte',
    extraitContenu: 'Un troisième beau contenu de carte',
    link: '/articles/titre',
    pourQui: 'Ceci est pour tous ceux à qui ça s\'adresse',
    titre: 'Un troisième titre de carte',
    url: 'https://some.example.com/3',
    ...override,
  };
}

export function aQuatrièmeCarteMesuresEmployeurs(override?: Partial<CarteMesuresEmployeurs>): CarteMesuresEmployeurs {
  return {
    article: {
      contenu: 'Contenu',
      slug: 'titre',
      titre: 'Titre',
    },
    bannière: {
      alt: 'text',
      url: 'https://animage.jpg',
    },
    contenu: 'Un quatrième beau contenu de carte',
    extraitContenu: 'Un quatrième beau contenu de carte',
    link: '/articles/titre',
    pourQui: 'Ceci est pour tous ceux à qui ça s\'adresse',
    titre: 'Un quatrième titre de carte',
    url: 'https://some.example.com/4',
    ...override,
  };
}

export function aCartesMesuresEmployeursList(): CarteMesuresEmployeurs[] {
  return [
    aCarteMesuresEmployeurs(),
    aDeuxièmeCarteMesuresEmployeurs(),
    aTroisièmeCarteMesuresEmployeurs(),
    aQuatrièmeCarteMesuresEmployeurs(),
  ];
}

export function mesuresEmployeursResponse(): StrapiSingleTypeResponse<MesuresEmployeursAttributesResponse> {
  return {
    data: {
      attributes: {
        dispositifs: [aCarteMesuresEmployeursResponse()],
      },
    },
  };
}

export function aCarteMesuresEmployeursResponse(override?: Partial<CarteMesuresEmployeursResponse>): CarteMesuresEmployeursResponse {
  return {
    article: aStrapiArticleResponse(),
    banniere: strapiImageFixture(),
    contenu: 'Un beau contenu de carte',
    pourQui: 'Ceci est pour tous ceux à qui ça s\'adresse',
    titre: 'Un titre de carte',
    url: 'https://some.example.com/1',
    ...override,
  };
}
