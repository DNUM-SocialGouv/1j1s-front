import { CarteMesuresEmployeurs, MesuresEmployeurs } from '~/server/cms/domain/mesuresEmployeurs';

export function desMesuresEmployeurs(): MesuresEmployeurs {
  return {
    dispositifs: aCartesMesuresEmployeursList(),
  };
}

export function aCarteMesuresEmployeurs(override?: Partial<CarteMesuresEmployeurs>): CarteMesuresEmployeurs {
  return {
    article: null,
    bannière: {
      alt: 'text',
      url: 'https://animage.jpg',
    },
    contenu: 'Un beau contenu de carte',
    extraitContenu: 'Un beau contenu de carte',
    link: 'https://some.example.com/1',
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

