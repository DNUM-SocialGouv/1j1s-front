import {
  RésultatRechercheÉtablissementPublicResponse,
} from '../apiÉtablissementPublic.response';

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

export function aRésultatRechercheÉtablissementPublicResponseInIncorrectOrder(): RésultatRechercheÉtablissementPublicResponse {
  return {
    features: [
      {
        properties: {
          adresses: [
            {
              codePostal: '75019',
              commune: 'Paris',
              lignes: [
                '90 rue Curial',
              ],
              type: 'Adresse',
            },
          ],
          horaires: [
            {
              au: 'Lundi',
              du: 'Lundi',
              heures: [
                {
                  a: '13:00:00',
                  de: '10:30:00',
                },
                {
                  a: '19:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Mardi',
              du: 'Mardi',
              heures: [
                {
                  a: '19:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Jeudi',
              du: 'Jeudi',
              heures: [
                {
                  a: '13:00:00',
                  de: '10:30:00',
                },
                {
                  a: '19:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Vendredi',
              du: 'Vendredi',
              heures: [
                {
                  a: '19:00:00',
                  de: '14:00:00',
                },
              ],
            },
          ],
          id: '12c9fee2-38c7-4d16-a27c-a2a9040f0475',
          nom: 'Point information jeunesse - Paris 19e arrondissement - Curial',
          telephone: '01 40 37 32 28',
        },
      },
      {
        properties: {
          adresses: [
            {
              codePostal: '75012',
              commune: 'Paris',
              lignes: [
                "3-5 rue d'Aligre",
              ],
              type: 'Adresse',
            },
          ],
          email: 'maisondesensembles@ligueparis.org',
          horaires: [
            {
              au: 'Vendredi',
              du: 'Lundi',
              heures: [
                {
                  a: '19:00:00',
                  de: '10:00:00',
                },
              ],
            },
            {
              au: 'Samedi',
              du: 'Samedi',
              heures: [
                {
                  a: '17:00:00',
                  de: '10:00:00',
                },
              ],
            },
          ],
          id: '12f15c57-ea33-4ec9-aa34-5e664f742872',
          nom: 'Point information jeunesse - Paris 12e - Maison des ensembles',
          telephone: '01 53 46 75 10',
        },
      },
      {
        properties: {
          adresses: [
            {
              codePostal: '75019',
              commune: 'Paris',
              lignes: [
                'Espace jeunes',
                '49 ter avenue de Flandre',
              ],
              type: 'Adresse',
            },
          ],
          email: 'ejf.espoir18@gmail.com',
          horaires: [
            {
              au: 'Vendredi',
              du: 'Lundi',
              heures: [
                {
                  a: '21:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Samedi',
              du: 'Samedi',
              heures: [
                {
                  a: '22:00:00',
                  de: '14:00:00',
                },
              ],
            },
          ],
          id: '254cc707-6403-40bf-a4be-f937eebc6ac9',
          nom: 'Centre information jeunesse - Paris - Flandre',
          telephone: '01 42 81 58 02',
        },
      },
      {
        properties: {
          adresses: [
            {
              codePostal: '75017',
              commune: 'Paris',
              lignes: [
                'Espace jeunes le 27',
                '27 rue Marguerite Long',
              ],
              type: 'Adresse',
            },
          ],
          email: 'epjle27@leolagrange.org',
          horaires: [
            {
              au: 'Mardi',
              du: 'Mardi',
              heures: [
                {
                  a: '19:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Mercredi',
              du: 'Mercredi',
              heures: [
                {
                  a: '13:00:00',
                  de: '10:00:00',
                },
                {
                  a: '18:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Jeudi',
              du: 'Jeudi',
              heures: [
                {
                  a: '19:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Vendredi',
              du: 'Vendredi',
              heures: [
                {
                  a: '19:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Samedi',
              du: 'Samedi',
              heures: [
                {
                  a: '18:00:00',
                  de: '14:00:00',
                },
              ],
            },
          ],
          id: '4f846571-e2d0-4c38-9cc9-ac79c56090c4',
          nom: 'Point information jeunesse - Paris 17e',
          telephone: '01 43 18 51 03',
        },
      },
      {
        properties: {
          adresses: [
            {
              codePostal: '75014',
              commune: 'Paris',
              lignes: [
                '64 rue de la Santé',
              ],
              type: 'Adresse',
            },
          ],
          horaires: [
            {
              au: 'Vendredi',
              du: 'Lundi',
              heures: [
                {
                  a: '19:00:00',
                  de: '14:00:00',
                },
              ],
            },
          ],
          id: '7d7c1fa0-7a1c-41e4-9f81-7f3e5e2e5e41',
          nom: 'Point information jeunesse - Paris 14e - ALJT',
          telephone: '01 44 16 89 08',
        },
      },
      {
        properties: {
          adresses: [
            {
              codePostal: '75012',
              commune: 'Paris',
              lignes: [
                'Centre Maurice-Ravel',
                '6 avenue Maurice-Ravel',
              ],
              type: 'Adresse',
            },
          ],
          email: 'pijravel@laligue.org',
          horaires: [
            {
              au: 'Mardi',
              du: 'Mardi',
              heures: [
                {
                  a: '19:00:00',
                  de: '16:00:00',
                },
              ],
            },
            {
              au: 'Mercredi',
              du: 'Mercredi',
              heures: [
                {
                  a: '17:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Jeudi',
              du: 'Jeudi',
              heures: [
                {
                  a: '16:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Vendredi',
              du: 'Vendredi',
              heures: [
                {
                  a: '17:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Samedi',
              du: 'Samedi',
              heures: [
                {
                  a: '12:00:00',
                  de: '10:00:00',
                },
                {
                  a: '17:00:00',
                  de: '14:00:00',
                },
              ],
            },
          ],
          id: '93ed2234-4bf7-4b69-a06c-87679308c3de',
          nom: "Point information jeunesse - Paris 12e - Anim' Ravel",
          telephone: '01 44 75 60 02',
        },
      },
      {
        properties: {
          adresses: [
            {
              codePostal: '75013',
              commune: 'Paris',
              lignes: [
                '6-8 rue Eugène Oudiné',
                'Siège',
              ],
              type: 'Adresse',
            },
          ],
          email: 'accueil@cidj.com',
          horaires: [
            {
              au: 'Vendredi',
              du: 'Lundi',
              heures: [
                {
                  a: '17:00:00',
                  de: '13:00:00',
                },
              ],
            },
            {
              au: 'Samedi',
              du: 'Samedi',
              heures: [
                {
                  a: '17:00:00',
                  de: '13:00:00',
                },
              ],
            },
          ],
          id: '94614f64-50ba-4ae1-9603-15c051cfcf40',
          nom: 'Centre information et documentation jeunesse - CIDJ',
          telephone: '01 88 40 41 80',
        },
      },
      {
        properties: {
          adresses: [
            {
              codePostal: '75011',
              commune: 'Paris',
              lignes: [
                '4 rue Louis Bonnet',
                'Espace Paris Jeunes Belleville',
              ],
              type: 'Adresse',
            },
          ],
          email: 'contact.epj.belleville@paris.ifac.asso.fr',
          horaires: [
            {
              au: 'Mercredi',
              du: 'Mercredi',
              heures: [
                {
                  a: '13:00:00',
                  de: '10:00:00',
                },
                {
                  a: '19:30:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Samedi',
              du: 'Samedi',
              heures: [
                {
                  a: '19:30:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Mardi',
              du: 'Mardi',
              heures: [
                {
                  a: '13:00:00',
                  de: '10:00:00',
                },
                {
                  a: '19:00:30',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Jeudi',
              du: 'Jeudi',
              heures: [
                {
                  a: '13:00:00',
                  de: '11:00:00',
                },
                {
                  a: '22:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Vendredi',
              du: 'Vendredi',
              heures: [
                {
                  a: '13:00:00',
                  de: '11:00:00',
                },
                {
                  a: '19:30:00',
                  de: '14:00:00',
                },
              ],
            },
          ],
          id: 'a668c144-57a4-46c5-80be-fc31ce828fb7',
          nom: 'Point information jeunesse - Paris 11e - Belleville',
          telephone: '01 48 06 48 45',
        },
      },
      {
        properties: {
          adresses: [
            {
              codePostal: '75018',
              commune: 'Paris',
              lignes: [
                '119 rue du Mont-Cenis',
              ],
              type: 'Adresse',
            },
          ],
          email: 'ajpmontcenis@gmail.com',
          horaires: [
            {
              au: 'Lundi',
              du: 'Lundi',
              heures: [
                {
                  a: '13:00:00',
                  de: '10:30:00',
                },
                {
                  a: '19:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Mercredi',
              du: 'Mardi',
              heures: [
                {
                  a: '19:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Jeudi',
              du: 'Jeudi',
              heures: [
                {
                  a: '13:00:00',
                  de: '10:30:00',
                },
                {
                  a: '19:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Vendredi',
              du: 'Vendredi',
              heures: [
                {
                  a: '19:00:00',
                  de: '14:00:00',
                },
              ],
            },
          ],
          id: 'ba70f229-221e-45cd-90b3-07d651c3170e',
          nom: 'Point information jeunesse - Paris 18e',
          telephone: '01 49 25 44 05',
        },
      },
      {
        properties: {
          adresses: [
            {
              codePostal: '75014',
              commune: 'Paris',
              lignes: [
                '40 rue Didot',
              ],
              type: 'Adresse',
            },
          ],
          email: 'jeunesseparisanim14sud@gmail.com',
          horaires: [
            {
              au: 'Samedi',
              du: 'Mardi',
              heures: [
                {
                  a: '13:00:00',
                  de: '11:00:00',
                },
                {
                  a: '19:00:00',
                  de: '14:00:00',
                },
              ],
            },
          ],
          id: 'c014ccac-681a-465f-b298-08f8c0f729d9',
          nom: 'Point information jeunesse - Paris 14e -  Jeunes-Didot',
          telephone: '01 77 10 12 17',
        },
      },
      {
        properties: {
          adresses: [
            {
              codePostal: '75011',
              commune: 'Paris',
              lignes: [
                "Centre Paris Anim' Mercœur",
                '4 rue Mercœur',
              ],
              type: 'Adresse',
            },
          ],
          email: 'sij@mercoeur.asso.fr',
          horaires: [
            {
              au: 'Samedi',
              du: 'Samedi',
              heures: [
                {
                  a: '18:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Mardi',
              du: 'Mardi',
              heures: [
                {
                  a: '19:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Mercredi',
              du: 'Mercredi',
              heures: [
                {
                  a: '19:00:00',
                  de: '16:00:00',
                },
              ],
            },
            {
              au: 'Jeudi',
              du: 'Jeudi',
              heures: [
                {
                  a: '19:00:00',
                  de: '15:00:00',
                },
              ],
            },
            {
              au: 'Vendredi',
              du: 'Vendredi',
              heures: [
                {
                  a: '18:00:00',
                  de: '14:00:00',
                },
              ],
            },
          ],
          id: 'c8b9c7f6-6a31-422f-945e-d16dde79209b',
          nom: 'Point information jeunesse - Paris 11e',
          telephone: '01 43 79 25 54',
        },
      },
      {
        properties: {
          adresses: [
            {
              codePostal: '75001',
              commune: 'Paris',
              lignes: [
                '3 rue du Coq-Héron',
              ],
              type: 'Adresse',
            },
          ],
          email: 'contact-ciej@sauvegarde-paris.fr',
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
                  de: '13:30:00',
                },
              ],
            },
          ],
          id: 'ca18f355-ab28-4bf0-a880-06d48f18de6d',
          nom: 'Point information jeunesse - Paris 1e',
          telephone: '01 40 39 70 00',
        },
      },
      {
        properties: {
          adresses: [
            {
              codePostal: '75009',
              commune: 'Paris',
              lignes: [
                '60 rue la Fayette',
              ],
              type: 'Adresse',
            },
          ],
          email: 'pijneuvieme@ligueparis.org',
          horaires: [
            {
              au: 'Mardi',
              du: 'Mardi',
              heures: [
                {
                  a: '13:00:00',
                  de: '10:00:00',
                },
                {
                  a: '18:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Mercredi',
              du: 'Mercredi',
              heures: [
                {
                  a: '18:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Jeudi',
              du: 'Jeudi',
              heures: [
                {
                  a: '19:00:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Vendredi',
              du: 'Vendredi',
              heures: [
                {
                  a: '18:00:00',
                  de: '14:00:00',
                },
              ],
            },
          ],
          id: 'cdb9f29f-289e-4075-bb99-2f9d03966cea',
          nom: 'Point information jeunesse - La Fayette',
          telephone: '01 42 29 65 36',
        },
      },
      {
        properties: {
          adresses: [
            {
              codePostal: '75020',
              commune: 'Paris',
              lignes: [
                '50 rue des Rigoles',
              ],
              type: 'Adresse',
            },
          ],
          email: 'contact.epj.taosamrouche@paris.ifac.asso.fr',
          horaires: [
            {
              au: 'Lundi',
              du: 'Lundi',
              heures: [
                {
                  a: '19:30:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Mardi',
              du: 'Mardi',
              heures: [
                {
                  a: '13:00:00',
                  de: '11:00:00',
                },
                {
                  a: '19:30:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Mercredi',
              du: 'Mercredi',
              heures: [
                {
                  a: '19:30:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Jeudi',
              du: 'Jeudi',
              heures: [
                {
                  a: '13:00:00',
                  de: '11:00:00',
                },
                {
                  a: '19:30:00',
                  de: '14:00:00',
                },
              ],
            },
            {
              au: 'Vendredi',
              du: 'Vendredi',
              heures: [
                {
                  a: '19:30:00',
                  de: '14:00:00',
                },
              ],
            },
          ],
          id: 'd78846fe-fdeb-4d12-9f3d-eaf0472a1020',
          nom: 'Point information jeunesse - Paris 20e - Espace Paris jeunes Taos Amrouche',
          telephone: '01 42 23 09 10',
        },
      },
      {
        properties: {
          adresses: [
            {
              codePostal: '75012',
              commune: 'Paris',
              lignes: [
                'Centre Maurice-Ravel',
                '6 avenue Maurice-Ravel',
              ],
              type: 'Adresse',
            },
          ],
          email: 'pijravel@laligue.org',
          horaires: [
            {
              au: 'Mardi',
              du: 'Mardi',
              heures: [
                {
                  a: '19:00:00',
                  de: '16:00:00',
                },
              ],
            },
            {
              au: 'Mercredi',
              du: 'Mercredi',
              heures: [
                {
                  a: '18:00:00',
                  de: '15:00:00',
                },
              ],
            },
            {
              au: 'Jeudi',
              du: 'Jeudi',
              heures: [
                {
                  a: '19:00:00',
                  de: '16:00:00',
                },
              ],
            },
            {
              au: 'Vendredi',
              du: 'Vendredi',
              heures: [
                {
                  a: '18:00:00',
                  de: '16:00:00',
                },
              ],
            },
            {
              au: 'Samedi',
              du: 'Samedi',
              heures: [
                {
                  a: '12:00:00',
                  de: '10:00:00',
                },
                {
                  a: '17:00:00',
                  de: '14:00:00',
                },
              ],
            },
          ],
          id: 'f33ed7f9-ed0b-4191-8a69-ffb1854d7d1a',
          nom: 'Point information jeunesse - Paris - 12e arrondissement',
          telephone: '01 44 75 60 02',
        },
      },
      {
        properties: {
          adresses: [
            {
              codePostal: '75013',
              commune: 'Paris',
              lignes: [
                'Tour Anvers',
                '32 rue du Javelot',
              ],
              type: 'Adresse',
            },
          ],
          email: 'pij-olympiades@mjcidf.org',
          horaires: [
            {
              au: 'Vendredi',
              du: 'Lundi',
              heures: [
                {
                  a: '19:00:00',
                  de: '14:00:00',
                },
              ],
            },
          ],
          id: 'f55d736a-0f4b-41ac-baae-eb9a3ccbbcc1',
          nom: 'Point information jeunesse - Paris 13e - Olympiades',
          telephone: '01 44 24 22 90',
        },
      },
    ],
  };
}
