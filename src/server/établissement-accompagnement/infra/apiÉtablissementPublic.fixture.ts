import {
  RésultatRechercheÉtablissementPublicResponse,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.response';

export function aRésultatRechercheÉtablissementPublicResponse(): RésultatRechercheÉtablissementPublicResponse {
  return {
    features: [
      {
        properties: {
          adresses: [
            {
              codePostal: '46400',
              commune: 'Saint-Céré',
              lignes: [
                '4 place gambetta',
                'Maison des Services Publics 1er étage',
              ],
              type: 'Mairie',
            },
          ],
          email: 'cyberbase@cauvaldor.fr',
          horaires: [
            {
              au: 'Vendredi',
              du: 'Lundi',
              heures: [
                {
                  a: '12:00:00',
                  de: '09:00:00',
                },
                {
                  a: '17:00:00',
                  de: '14:00:00',
                },
              ],
            },
          ],
          id: '1fe2b5e7-e80f-47ca-9cf7-84e7e99b8c07',
          nom: 'Point information jeunesse - Saint-Céré',
          telephone: '05 65 38 07 15',
        },
      },
      {
        properties: {
          adresses: [
            {
              codePostal: '46100',
              commune: 'Figeac',
              lignes: [
                '1 ter avenue Philibert-Delprat',
              ],
              type: 'Adresse',
            },
          ],
          email: 'figeac.pij@wanadoo.fr',
          horaires: [
            {
              au: 'Jeudi',
              du: 'Lundi',
              heures: [
                {
                  a: '17:00:00',
                  de: '13:00:00',
                },
              ],
            },
            {
              au: 'Vendredi',
              du: 'Vendredi',
              heures: [
                {
                  a: '16:00:00',
                  de: '12:30:00',
                },
              ],
            },
          ],
          id: 'bcb60ef1-6afc-45c7-b530-fa635cc20bc6',
          nom: 'Point information jeunesse - Figeac',
          telephone: '05 65 34 34 49',
        },
      },
      {
        properties: {
          adresses: [
            {
              codePostal: '46400',
              commune: 'Saint-Céré',
              lignes: [
                '4 place gambetta',
                'Maison des Services Publics 1er étage',
              ],
              type: 'Adresse',
            },
          ],
          email: 'cyberbase@cauvaldor.fr',
          horaires: [
            {
              au: 'Jeudi',
              du: 'Lundi',
              heures: [
                {
                  a: '12:00:00',
                  de: '09:00:00',
                },
                {
                  a: '17:00:00',
                  de: '14:00:00',
                },
              ],
            },
          ],
          id: '698e58e6-f3f9-42e4-ae2b-bff878dd59e8',
          nom: 'Point information jeunesse - Saint-Céré',
          telephone: '05 65 38 07 15',
        },
      },
    ],
  };
}
