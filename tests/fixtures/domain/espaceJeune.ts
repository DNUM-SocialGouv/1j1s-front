import { CarteEspaceJeune, EspaceJeune } from '~/server/cms/domain/espaceJeune';
import {
  EspaceJeuneAttributesResponse,
  StrapiSingleTypeResponse,
} from '~/server/cms/infra/repositories/strapi.response';
import { Strapi } from '~/server/services/cms/infra/repositories/responses/cmsResponse';

export function aCarteEspaceJeune(override?: Partial<CarteEspaceJeune>): CarteEspaceJeune {
  return {
    bannière: {
      alt: 'text',
      url: 'https://animage.jpg',
    },
    concerné: 'pour les 12 à 18mois',
    contenu: 'Un beau contenu de carte',
    titre: 'Un titre de carte',
    url: 'Une belle url de carte',
    ...override,
  };
}

export function aDeuxièmeCarteEspaceJeune(override?: Partial<CarteEspaceJeune>): CarteEspaceJeune {
  return {
    bannière: {
      alt: 'text',
      url: 'https://animage.jpg',
    },
    concerné: 'pour les 12 à 18mois',
    contenu: 'Un deuxième beau contenu de carte',
    titre: 'Un deuxième titre de carte',
    url: 'Une deuxième belle url de carte',
    ...override,
  };
}

export function aTroisièmeCarteEspaceJeune(override?: Partial<CarteEspaceJeune>): CarteEspaceJeune {
  return {
    bannière: {
      alt: 'text',
      url: 'https://animage.jpg',
    },
    concerné: 'pour les 12 à 18mois',
    contenu: 'Un troisième beau contenu de carte',
    titre: 'Un troisième titre de carte',
    url: 'Une troisième belle url de carte',
    ...override,
  };
}

export function aQuatrièmeCarteEspaceJeune(override?: Partial<CarteEspaceJeune>): CarteEspaceJeune {
  return {
    bannière: {
      alt: 'text',
      url: 'https://animage.jpg',
    },
    concerné: 'pour les 12 à 18mois',
    contenu: 'Un quatrième beau contenu de carte',
    titre: 'Un quatrième titre de carte',
    url: 'Une quatrième belle url de carte',
    ...override,
  };
}

export function aCarteEspaceJeuneList(): CarteEspaceJeune[] {
  return [aCarteEspaceJeune(), aDeuxièmeCarteEspaceJeune(), aTroisièmeCarteEspaceJeune(), aQuatrièmeCarteEspaceJeune()];
}

export function anEspaceJeune(): EspaceJeune {
  return {
    accompagnement: aCarteEspaceJeuneList(),
    aidesFinancières:  aCarteEspaceJeuneList(),
    orienterFormer:  aCarteEspaceJeuneList(),
    vieProfessionnelle:  aCarteEspaceJeuneList(),
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

export function anEspaceJeuneResponse(override?: Partial<StrapiSingleTypeResponse<EspaceJeuneAttributesResponse>>): StrapiSingleTypeResponse<EspaceJeuneAttributesResponse> {
  return {
    data: {
      attributes: {
        accompagnement: [
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un beau contenu de carte',
            pourQui: 'pour les 12 à 18mois',
            titre: 'Un titre de carte',
            url: 'Une belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un deuxième beau contenu de carte',
            pourQui: 'pour les 12 à 18mois',
            titre: 'Un deuxième titre de carte',
            url: 'Une deuxième belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un troisième beau contenu de carte',
            pourQui: 'pour les 12 à 18mois',
            titre: 'Un troisième titre de carte',
            url: 'Une troisième belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un quatrième beau contenu de carte',
            pourQui: 'pour les 12 à 18mois',
            titre: 'Un quatrième titre de carte',
            url: 'Une quatrième belle url de carte',
          },
        ],
        aidesFinancieres: [
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un beau contenu de carte',
            pourQui: 'pour les 12 à 18mois',
            titre: 'Un titre de carte',
            url: 'Une belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un deuxième beau contenu de carte',
            pourQui: 'pour les 12 à 18mois',
            titre: 'Un deuxième titre de carte',
            url: 'Une deuxième belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un troisième beau contenu de carte',
            pourQui: 'pour les 12 à 18mois',
            titre: 'Un troisième titre de carte',
            url: 'Une troisième belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un quatrième beau contenu de carte',
            pourQui: 'pour les 12 à 18mois',
            titre: 'Un quatrième titre de carte',
            url: 'Une quatrième belle url de carte',
          },
        ],
        orienterFormer: [
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un beau contenu de carte',
            pourQui: 'pour les 12 à 18mois',
            titre: 'Un titre de carte',
            url: 'Une belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un deuxième beau contenu de carte',
            pourQui: 'pour les 12 à 18mois',
            titre: 'Un deuxième titre de carte',
            url: 'Une deuxième belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un troisième beau contenu de carte',
            pourQui: 'pour les 12 à 18mois',
            titre: 'Un troisième titre de carte',
            url: 'Une troisième belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un quatrième beau contenu de carte',
            pourQui: 'pour les 12 à 18mois',
            titre: 'Un quatrième titre de carte',
            url: 'Une quatrième belle url de carte',
          },
        ],
        vieProfessionnelle: [
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un beau contenu de carte',
            pourQui: 'pour les 12 à 18mois',
            titre: 'Un titre de carte',
            url: 'Une belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un deuxième beau contenu de carte',
            pourQui: 'pour les 12 à 18mois',
            titre: 'Un deuxième titre de carte',
            url: 'Une deuxième belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un troisième beau contenu de carte',
            pourQui: 'pour les 12 à 18mois',
            titre: 'Un troisième titre de carte',
            url: 'Une troisième belle url de carte',
          },
          {
            banniere: aStrapiResponseImage(),
            contenu: 'Un quatrième beau contenu de carte',
            pourQui: 'pour les 12 à 18mois',
            titre: 'Un quatrième titre de carte',
            url: 'Une quatrième belle url de carte',
          },
        ],
      },
    },
    ...override,
  };
}
