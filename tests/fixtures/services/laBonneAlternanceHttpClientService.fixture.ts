import { anAxiosInstance, anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';
import { AxiosResponse } from 'axios';

import { LaBonneAlternanceHttpClient } from '~/server/services/http/laBonneAlternanceHttpClient.service';

export function aLaBonneAlternanceHttpClient(): LaBonneAlternanceHttpClient {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
    setAuthorizationHeader: jest.fn(),
  } as unknown as LaBonneAlternanceHttpClient;
}

export function aRechercheMétierResponse(): AxiosResponse {
  return anAxiosResponse({
    labelsAndRomes: [
      {
        label: 'Boucherie, charcuterie, traiteur',
        rncps: [
          'RNCP15078',
          'RNCP19184',
          'RNCP26612',
          'RNCP34311',
          'RNCP34375',
          'RNCP7067',
          'RNCP7069',
          'RNCP7580',
          'RNCP975',
        ],
        romes: ['D1103', 'D1101', 'H2101'],
        type: 'job',
      },
      {
        label: 'Boulangerie, pâtisserie, chocolaterie',
        rncps: [
          'RNCP13856',
          'RNCP1473',
          'RNCP9824',
          'RNCP5226',
          'RNCP588',
          'RNCP6900',
          'RNCP6901',
          'RNCP7068',
          'RNCP891',
          'RNCP9084',
        ],
        romes: ['D1102', 'D1104'],
        type: 'job',
      },
    ],
  });
}

export function aAlternanceListResponse(): AxiosResponse {
  return anAxiosResponse(
    {
      matchas: {
        results: [
          {
            capacity: null,
            cfd: null,
            company: {
              creationDate: '1970-01-17T12:50:16.800Z',
              description: null,
              headquarter: null,
              id: null,
              logo: null,
              mandataire: false,
              name: 'BOUCHERIE STEPHANE VEIT',
              place: null,
              siret: '81077251700019',
              size: '3 à 5 salariés',
              socialNetwork: null,
              uai: null,
              url: null,
            },
            contact: {
              name: 'STEPHANE VEIT',
              phone: '0646057107',
            },
            createdAt: '2022-05-22T16:27:30.387Z',
            diploma: null,
            diplomaLevel: 'Cap, autres formations niveau (Infrabac)',
            id: 'uC0lLVLzjUohfv1uWsitn-0',
            ideaType: 'matcha',
            job: {
              contractType: [
                'Apprentissage',
                'Professionnalisation',
              ],
              creationDate: '2022-05-22T16:27:30.387Z',
              dureeContrat: 1,
              elligibleHandicap: true,
              id: '628a64ed2ff4860027ae1501',
              jobStartDate: '2022-01-09T00:00:00.000Z',
              quantiteContrat: 1,
              romeDetails: {
                acces: 'Cet emploi/métier est accessible avec un diplôme de niveau CAP/BEP à Bac (Bac Professionnel, Brevet Professionnel, Brevet de maîtrise) en boucherie.\\nIl est également accessible sans diplôme ni expérience professionnelle pour le poste d\'aide-boucher.',
                appellations: [
                  {
                    code: '10867',
                    libelle: 'Aide-boucher / Aide-bouchère',
                    libelleCourt: 'Aide-boucher / Aide-bouchère',
                    particulier: false,
                  },
                  {
                    code: '12005',
                    libelle: 'Chef boucher / bouchère',
                    libelleCourt: 'Chef boucher / bouchère',
                    particulier: false,
                  },
                  {
                    code: '11564',
                    libelle: 'Boucher / Bouchère',
                    libelleCourt: 'Boucher / Bouchère',
                    particulier: false,
                  },
                  {
                    code: '11565',
                    libelle: 'Boucher / Bouchère chevalin',
                    libelleCourt: 'Boucher / Bouchère chevalin',
                    particulier: false,
                  },
                  {
                    code: '11566',
                    libelle: 'Boucher désosseur / Bouchère désosseuse',
                    libelleCourt: 'Boucher désosseur / Bouchère désosseuse',
                    particulier: false,
                  },
                  {
                    code: '11567',
                    libelle: 'Boucher / Bouchère hippophagique',
                    libelleCourt: 'Boucher / Bouchère hippophagique',
                    particulier: false,
                  },
                  {
                    code: '11569',
                    libelle: 'Boucher-charcutier / Bouchère-charcutière',
                    libelleCourt: 'Boucher-charcutier / Bouchère-charcutière',
                    particulier: false,
                  },
                  {
                    code: '11570',
                    libelle: 'Boucher-traiteur / Bouchère-traiteuse',
                    libelleCourt: 'Boucher-traiteur / Bouchère-traiteuse',
                    particulier: false,
                  },
                  {
                    code: '11571',
                    libelle: 'Boucher-tripier / Bouchère-tripière',
                    libelleCourt: 'Boucher-tripier / Bouchère-tripière',
                    particulier: false,
                  },
                  {
                    code: '11572',
                    libelle: 'Boucher-volailler / Bouchère-volaillère',
                    libelleCourt: 'Boucher-volailler / Bouchère-volaillère',
                    particulier: false,
                  },
                  {
                    code: '17406',
                    libelle: 'Ouvrier boucher / Ouvrière bouchère',
                    libelleCourt: 'Ouvrier boucher / Ouvrière bouchère',
                    particulier: false,
                  },
                  {
                    code: '19351',
                    libelle: 'Second boucher / Seconde bouchère',
                    libelleCourt: 'Second boucher / Seconde bouchère',
                    particulier: false,
                  },
                ],
                code: 'D1101',
                codeIsco: '7511',
                competencesDeBase: [
                  {
                    code: '121945',
                    libelle: 'Réceptionner des carcasses de viande',
                    noeudCompetence: {
                      code: '00002',
                      libelle: 'Abattage et découpe de viande',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '124033',
                    libelle: 'Contrôler la qualité d\'un produit',
                    noeudCompetence: {
                      code: '00059',
                      libelle: 'Contrôle qualité',
                      racineCompetence: {
                        code: '00039',
                        libelle: 'Qualité',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '122688',
                    libelle: 'Préparer une carcasse aux opérations de découpe',
                    noeudCompetence: {
                      code: '00002',
                      libelle: 'Abattage et découpe de viande',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '118018',
                    libelle: 'Découper de la viande',
                    noeudCompetence: {
                      code: '00002',
                      libelle: 'Abattage et découpe de viande',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '123013',
                    libelle: 'Trier des pièces de viande',
                    noeudCompetence: {
                      code: '00002',
                      libelle: 'Abattage et découpe de viande',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '120224',
                    libelle: 'Détailler des pièces de viande',
                    noeudCompetence: {
                      code: '00002',
                      libelle: 'Abattage et découpe de viande',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '120220',
                    libelle: 'Conditionner des pièces de viande, des spécialités bouchères',
                    noeudCompetence: {
                      code: '00325',
                      libelle: 'Techniques de production alimentaire',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '117532',
                    libelle: 'Disposer des produits sur le lieu de vente',
                    noeudCompetence: {
                      code: '00186',
                      libelle: 'Merchandising',
                      racineCompetence: {
                        code: '00001',
                        libelle: 'Achat - vente',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '122330',
                    libelle: 'Renseigner un client',
                    noeudCompetence: {
                      code: '00366',
                      libelle: 'Relation client',
                      racineCompetence: {
                        code: '00001',
                        libelle: 'Achat - vente',
                      },
                    },
                    riasecMajeur: 'S',
                    riasecMineur: 'S',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '104304',
                    libelle: 'Prendre la commande des clients',
                    noeudCompetence: {
                      code: '00303',
                      libelle: 'Service en salle',
                      racineCompetence: {
                        code: '00010',
                        libelle: 'Cuisine - restauration',
                      },
                    },
                    riasecMajeur: 'E',
                    riasecMineur: 'C',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '124545',
                    libelle: 'Entretenir un espace de vente',
                    noeudCompetence: {
                      code: '00204',
                      libelle: 'Nettoyage - entretien de locaux',
                      racineCompetence: {
                        code: '00034',
                        libelle: 'Nettoyage - entretien',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '124547',
                    libelle: 'Nettoyer du matériel ou un équipement',
                    noeudCompetence: {
                      code: '00205',
                      libelle: 'Nettoyage - entretien de matériels et d\'installations',
                      racineCompetence: {
                        code: '00034',
                        libelle: 'Nettoyage - entretien',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '124548',
                    libelle: 'Entretenir un poste de travail',
                    noeudCompetence: {
                      code: '00204',
                      libelle: 'Nettoyage - entretien de locaux',
                      racineCompetence: {
                        code: '00034',
                        libelle: 'Nettoyage - entretien',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '101718',
                    libelle: 'Techniques de désossage',
                    noeudCompetence: {
                      code: '00325',
                      libelle: 'Techniques de production alimentaire',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '101719',
                    libelle: 'Techniques de parage des viandes',
                    noeudCompetence: {
                      code: '00325',
                      libelle: 'Techniques de production alimentaire',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '116573',
                    libelle: 'Boucherie',
                    noeudCompetence: {
                      code: '00029',
                      libelle: 'Caractéristiques et types de produits alimentaires',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '101782',
                    libelle: 'Modes de cuisson des aliments',
                    noeudCompetence: {
                      code: '00252',
                      libelle: 'Préparations et réalisations culinaires',
                      racineCompetence: {
                        code: '00010',
                        libelle: 'Cuisine - restauration',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '121946',
                    libelle: 'Découpe de viande',
                    noeudCompetence: {
                      code: '00343',
                      libelle: 'Traitement et transformation des viandes',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '101716',
                    libelle: 'Chaîne du froid',
                    noeudCompetence: {
                      code: '00283',
                      libelle: 'Règlementation sanitaire - règles d\'hygiène',
                      racineCompetence: {
                        code: '00042',
                        libelle: 'Règlementation sanitaire - règles d\'hygiène',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '122410',
                    libelle: 'Stockage de produits alimentaires',
                    noeudCompetence: {
                      code: '00138',
                      libelle: 'Gestion des stocks et inventaires',
                      racineCompetence: {
                        code: '00029',
                        libelle: 'Logistique',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '100359',
                    libelle: 'Règles d\'hygiène et de sécurité alimentaire',
                    noeudCompetence: {
                      code: '00283',
                      libelle: 'Règlementation sanitaire - règles d\'hygiène',
                      racineCompetence: {
                        code: '00042',
                        libelle: 'Règlementation sanitaire - règles d\'hygiène',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '100429',
                    libelle: 'Anatomie animale',
                    noeudCompetence: {
                      code: '00035',
                      libelle: 'Chirurgie animale',
                      racineCompetence: {
                        code: '00046',
                        libelle: 'Santé animale',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '100259',
                    libelle: 'Utilisation de matériel de nettoyage',
                    noeudCompetence: {
                      code: '00327',
                      libelle: 'Techniques et matériel de nettoyage',
                      racineCompetence: {
                        code: '00034',
                        libelle: 'Nettoyage - entretien',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '101720',
                    libelle: 'Techniques d\'embossage de viande',
                    noeudCompetence: {
                      code: '00325',
                      libelle: 'Techniques de production alimentaire',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '101715',
                    libelle: 'Ficelage des viandes',
                    noeudCompetence: {
                      code: '00251',
                      libelle: 'Préparations alimentaires',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '100143',
                    libelle: 'Traçabilité des produits',
                    noeudCompetence: {
                      code: '00071',
                      libelle: 'Démarche qualité',
                      racineCompetence: {
                        code: '00039',
                        libelle: 'Qualité',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '119525',
                    libelle: 'Techniques de transformation des viandes',
                    noeudCompetence: {
                      code: '00325',
                      libelle: 'Techniques de production alimentaire',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                ],
                condition: 'L\'activité de cet emploi/métier s\'exerce au sein de boucheries, de boucheries-charcuteries, aux rayons boucherie de grandes et moyennes surfaces, sur les marchés, en contact avec les clients, en relation avec les fournisseurs, le responsable de rayon et différents services (livraisons, services vétérinaires, services d\'hygiène).\\nElle varie selon la structure (entreprise artisanale, hypermarché, ...).\\nElle peut s\'exercer les fins de semaine.\\nL\'activité s\'effectue en laboratoire, en magasin et peut impliquer le port de charges et la station debout prolongée.\\nLe port d\'équipement de protection (tablier, chaussures de sécurité, ...) peut être requis.',
                definition: 'Réalise les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires.\\nPeut effectuer la vente de produits de boucherie.\\nPeut gérer un commerce de détail alimentaire (boucherie, boucherie-charcuterie, ...).',
                domaineProfessionnel: {
                  code: 'D11',
                  grandDomaine: {
                    code: 'D',
                    libelle: 'Commerce, Vente et Grande distribution',
                  },
                  libelle: 'Commerce alimentaire et métiers de bouche',
                },
                environnementsTravail: [
                  {
                    code: '23401',
                    libelle: 'Armée',
                    typeEnvironnementTravail: 'Secteur',
                  },
                  {
                    code: '23721',
                    libelle: 'Boucherie',
                    typeEnvironnementTravail: 'Structure',
                  },
                  {
                    code: '23722',
                    libelle: 'Boucherie-charcuterie',
                    typeEnvironnementTravail: 'Structure',
                  },
                  {
                    code: '23967',
                    libelle: 'Hypermarché (2500 m² et +)',
                    typeEnvironnementTravail: 'Structure',
                  },
                  {
                    code: '24005',
                    libelle: 'Marché, foire exposition',
                    typeEnvironnementTravail: 'Structure',
                  },
                  {
                    code: '24116',
                    libelle: 'Supermarché (400 à 2500m²)',
                    typeEnvironnementTravail: 'Structure',
                  },
                  {
                    code: '24844',
                    libelle: 'Travail en indépendant',
                    typeEnvironnementTravail: 'Condition',
                  },
                ],
                groupesCompetencesSpecifiques: [
                  {
                    competences: [
                      {
                        code: '126218',
                        libelle: 'Découper, désosser, parer de l\'agneau',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '126258',
                        libelle: 'Découper, désosser, parer du boeuf',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '126416',
                        libelle: 'Découper, désosser, parer du cheval',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '126080',
                        libelle: 'Découper, désosser, parer du gibier, des viandes exotiques',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '126417',
                        libelle: 'Découper, désosser, parer du lapin',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '126241',
                        libelle: 'Découper, désosser, parer du mouton',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '126197',
                        libelle: 'Découper, désosser, parer du porc',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '126242',
                        libelle: 'Découper, désosser, parer du veau',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '126243',
                        libelle: 'Découper, désosser, parer des volailles',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                    ],
                  },
                  {
                    competences: [
                      {
                        code: '120230',
                        libelle: 'Préparer des plats cuisinés',
                        noeudCompetence: {
                          code: '00252',
                          libelle: 'Préparations et réalisations culinaires',
                          racineCompetence: {
                            code: '00010',
                            libelle: 'Cuisine - restauration',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '119443',
                        libelle: 'Cuisiner des produits de charcuterie',
                        noeudCompetence: {
                          code: '00275',
                          libelle: 'Réalisations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '119442',
                        libelle: 'Cuisiner des produits de rôtisserie',
                        noeudCompetence: {
                          code: '00275',
                          libelle: 'Réalisations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '119444',
                        libelle: 'Cuisiner des produits tripiers',
                        noeudCompetence: {
                          code: '00275',
                          libelle: 'Réalisations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '119441',
                        libelle: 'Cuisiner des spécialités bouchères',
                        noeudCompetence: {
                          code: '00275',
                          libelle: 'Réalisations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '119438',
                        libelle: 'Cuisiner des viandes',
                        noeudCompetence: {
                          code: '00252',
                          libelle: 'Préparations et réalisations culinaires',
                          racineCompetence: {
                            code: '00010',
                            libelle: 'Cuisine - restauration',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '119503',
                        libelle: 'Préparations culinaires de base',
                        noeudCompetence: {
                          code: '00252',
                          libelle: 'Préparations et réalisations culinaires',
                          racineCompetence: {
                            code: '00010',
                            libelle: 'Cuisine - restauration',
                          },
                        },
                        typeCompetence: 'Savoir',
                      },
                    ],
                  },
                  {
                    competences: [
                      {
                        code: '123014',
                        libelle: 'Sélectionner une bête auprès d\'un producteur',
                        noeudCompetence: {
                          code: '00002',
                          libelle: 'Abattage et découpe de viande',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'E',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '100038',
                        libelle: 'Chiffrage/calcul de coût',
                        noeudCompetence: {
                          code: '00172',
                          libelle: 'Manipulation de chiffres des ordres de grandeur',
                          racineCompetence: {
                            code: '00007',
                            libelle: 'Compétences transverses',
                          },
                        },
                        typeCompetence: 'Savoir',
                      },
                    ],
                  },
                  {
                    competences: [
                      {
                        code: '114110',
                        libelle: 'Vider et nettoyer des bêtes',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                    ],
                  },
                  {
                    competences: [
                      {
                        code: '122183',
                        libelle: 'Vendre des produits ou services',
                        noeudCompetence: {
                          code: '00361',
                          libelle: 'Vente',
                          racineCompetence: {
                            code: '00001',
                            libelle: 'Achat - vente',
                          },
                        },
                        riasecMajeur: 'E',
                        riasecMineur: 'E',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '100340',
                        libelle: 'Techniques de vente',
                        noeudCompetence: {
                          code: '00361',
                          libelle: 'Vente',
                          racineCompetence: {
                            code: '00001',
                            libelle: 'Achat - vente',
                          },
                        },
                        typeCompetence: 'Savoir',
                      },
                      {
                        code: '100341',
                        libelle: 'Procédures d\'encaissement',
                        noeudCompetence: {
                          code: '00331',
                          libelle: 'Tenue de caisse',
                          racineCompetence: {
                            code: '00001',
                            libelle: 'Achat - vente',
                          },
                        },
                        typeCompetence: 'Savoir',
                      },
                    ],
                  },
                  {
                    competences: [
                      {
                        code: '116932',
                        libelle: 'Suivre l\'état des stocks',
                        noeudCompetence: {
                          code: '00138',
                          libelle: 'Gestion des stocks et inventaires',
                          racineCompetence: {
                            code: '00029',
                            libelle: 'Logistique',
                          },
                        },
                        riasecMajeur: 'C',
                        riasecMineur: 'C',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '125971',
                        libelle: 'Définir des besoins en approvisionnement',
                        noeudCompetence: {
                          code: '00134',
                          libelle: 'Gestion des commandes',
                          racineCompetence: {
                            code: '00029',
                            libelle: 'Logistique',
                          },
                        },
                        riasecMajeur: 'C',
                        riasecMineur: 'C',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '119860',
                        libelle: 'Préparer les commandes',
                        noeudCompetence: {
                          code: '00134',
                          libelle: 'Gestion des commandes',
                          racineCompetence: {
                            code: '00029',
                            libelle: 'Logistique',
                          },
                        },
                        riasecMajeur: 'C',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '119000',
                        libelle: 'Gestion des stocks et des approvisionnements',
                        noeudCompetence: {
                          code: '00138',
                          libelle: 'Gestion des stocks et inventaires',
                          racineCompetence: {
                            code: '00029',
                            libelle: 'Logistique',
                          },
                        },
                        typeCompetence: 'Savoir',
                      },
                    ],
                  },
                  {
                    competences: [
                      {
                        code: '124318',
                        libelle: 'Réaliser une gestion comptable',
                        noeudCompetence: {
                          code: '00143',
                          libelle: 'Gestion et contrôles comptables',
                          racineCompetence: {
                            code: '00008',
                            libelle: 'Comptabilité - contrôle de gestion - audit',
                          },
                        },
                        riasecMajeur: 'C',
                        riasecMineur: 'C',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '124377',
                        libelle: 'Réaliser une gestion administrative',
                        noeudCompetence: {
                          code: '00341',
                          libelle: 'Traitement des opérations administratives et financières',
                          racineCompetence: {
                            code: '00007',
                            libelle: 'Compétences transverses',
                          },
                        },
                        riasecMajeur: 'C',
                        riasecMineur: 'C',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '120886',
                        libelle: 'Logiciels comptables',
                        noeudCompetence: {
                          code: '00005',
                          libelle: 'Actes comptables',
                          racineCompetence: {
                            code: '00008',
                            libelle: 'Comptabilité - contrôle de gestion - audit',
                          },
                        },
                        typeCompetence: 'Savoir',
                      },
                      {
                        code: '120889',
                        libelle: 'Gestion administrative',
                        noeudCompetence: {
                          code: '00341',
                          libelle: 'Traitement des opérations administratives et financières',
                          racineCompetence: {
                            code: '00007',
                            libelle: 'Compétences transverses',
                          },
                        },
                        typeCompetence: 'Savoir',
                      },
                      {
                        code: '120888',
                        libelle: 'Gestion comptable',
                        noeudCompetence: {
                          code: '00143',
                          libelle: 'Gestion et contrôles comptables',
                          racineCompetence: {
                            code: '00008',
                            libelle: 'Comptabilité - contrôle de gestion - audit',
                          },
                        },
                        typeCompetence: 'Savoir',
                      },
                    ],
                  },
                  {
                    competences: [
                      {
                        code: '113954',
                        libelle: 'Transmettre les techniques du métier ou mener des actions de sensibilisation au métier',
                        noeudCompetence: {
                          code: '00017',
                          libelle: 'Animation de formation et coaching',
                          racineCompetence: {
                            code: '00017',
                            libelle: 'Enseignement - formation - orientation',
                          },
                        },
                        riasecMajeur: 'S',
                        riasecMineur: 'S',
                        typeCompetence: 'SavoirFaire',
                      },
                    ],
                  },
                ],
                libelle: 'Boucherie',
                mobilitesEvolutionsAppellationsVersAppellations: [],
                mobilitesEvolutionsAppellationsVersMetiers: [],
                mobilitesEvolutionsVersAppellations: [
                  {
                    appellationCible: {
                      code: '16741',
                      libelle: 'Moniteur / Monitrice en centre de formation d\'apprentis',
                      libelleCourt: 'Moniteur / Monitrice en centre de formation d\'apprentis',
                      metier: {
                        code: 'K2109',
                        libelle: 'Enseignement technique et professionnel',
                      },
                    },
                  },
                  {
                    appellationCible: {
                      code: '11388',
                      libelle: 'Attaché commercial / Attachée commerciale grandes et moyennes surfaces de vente (GMS)',
                      libelleCourt: 'Attaché(e) commercial(e) grandes, moyennes surfaces de vente',
                      metier: {
                        code: 'D1402',
                        libelle: 'Relation commerciale grands comptes et entreprises',
                      },
                    },
                  },
                ],
                mobilitesEvolutionsVersMetiers: [
                  {
                    metierCible: {
                      code: 'D1502',
                      libelle: 'Management/gestion de rayon produits alimentaires',
                    },
                  },
                  {
                    metierCible: {
                      code: 'D1301',
                      libelle: 'Management de magasin de détail',
                    },
                  },
                  {
                    metierCible: {
                      code: 'D1103',
                      libelle: 'Charcuterie - traiteur',
                    },
                  },
                ],
                mobilitesProchesAppellationsVersAppellations: [],
                mobilitesProchesAppellationsVersMetiers: [],
                mobilitesProchesVersAppellations: [],
                mobilitesProchesVersMetiers: [
                  {
                    metierCible: {
                      code: 'D1107',
                      libelle: 'Vente en gros de produits frais',
                    },
                  },
                  {
                    metierCible: {
                      code: 'D1106',
                      libelle: 'Vente en alimentation',
                    },
                  },
                ],
                particulier: false,
                riasecMajeur: 'R',
                riasecMineur: 'E',
                themes: [],
              },
              rythmeAlternance: '2 semaines / 3 semaines',
            },
            lastUpdateAt: '2022-05-22T16:32:39.319Z',
            longTitle: null,
            nafs: [
              {
                label: 'Commerce de détail de viandes et de produits à base de viande en magasin spécialisé',
              },
            ],
            onisepUrl: null,
            period: null,
            place: {
              address: '77 RUE DES BOURGUIGNONS 92270 BOIS-COLOMBES',
              cedex: null,
              city: null,
              departementNumber: null,
              distance: 298.9,
              fullAddress: '77 RUE DES BOURGUIGNONS 92270 BOIS-COLOMBES',
              insee: null,
              latitude: '48.915675',
              longitude: '2.27597',
              region: null,
              zipCode: null,
            },
            rncpCode: null,
            rncpEligibleApprentissage: null,
            rncpLabel: null,
            romes: [
              {
                code: 'D1101',
              },
            ],
            title: 'Boucherie',
            training: null,
            url: null,
          },
          {
            capacity: null,
            cfd: null,
            company: {
              creationDate: '1970-01-17T12:50:16.800Z',
              description: null,
              headquarter: null,
              id: null,
              logo: null,
              mandataire: false,
              name: 'BOUCHERIE STEPHANE VEIT',
              place: null,
              siret: '81077251700019',
              size: '3 à 5 salariés',
              socialNetwork: null,
              uai: null,
              url: null,
            },
            contact: {
              name: 'STEPHANE VEIT',
              phone: '0646057107',
            },
            createdAt: '2022-05-22T16:27:30.387Z',
            diploma: null,
            diplomaLevel: 'Cap, autres formations niveau (Infrabac)',
            id: 'uC0lLVLzjUohfv1uWsitn-1',
            ideaType: 'matcha',
            job: {
              contractType: [
                'Apprentissage',
                'Professionnalisation',
              ],
              creationDate: '2022-05-22T16:27:30.387Z',
              dureeContrat: 2,
              elligibleHandicap: true,
              id: '628a65a72ff4860027ae1531',
              jobStartDate: '2022-09-01T00:00:00.000Z',
              quantiteContrat: 1,
              romeDetails: {
                acces: 'Cet emploi/métier est accessible avec un diplôme de niveau CAP/BEP à Bac (Bac Professionnel, Brevet Professionnel, Brevet de maîtrise) en boucherie.\\nIl est également accessible sans diplôme ni expérience professionnelle pour le poste d\'aide-boucher.',
                appellations: [
                  {
                    code: '10867',
                    libelle: 'Aide-boucher / Aide-bouchère',
                    libelleCourt: 'Aide-boucher / Aide-bouchère',
                    particulier: false,
                  },
                  {
                    code: '12005',
                    libelle: 'Chef boucher / bouchère',
                    libelleCourt: 'Chef boucher / bouchère',
                    particulier: false,
                  },
                  {
                    code: '11564',
                    libelle: 'Boucher / Bouchère',
                    libelleCourt: 'Boucher / Bouchère',
                    particulier: false,
                  },
                  {
                    code: '11565',
                    libelle: 'Boucher / Bouchère chevalin',
                    libelleCourt: 'Boucher / Bouchère chevalin',
                    particulier: false,
                  },
                  {
                    code: '11566',
                    libelle: 'Boucher désosseur / Bouchère désosseuse',
                    libelleCourt: 'Boucher désosseur / Bouchère désosseuse',
                    particulier: false,
                  },
                  {
                    code: '11567',
                    libelle: 'Boucher / Bouchère hippophagique',
                    libelleCourt: 'Boucher / Bouchère hippophagique',
                    particulier: false,
                  },
                  {
                    code: '11569',
                    libelle: 'Boucher-charcutier / Bouchère-charcutière',
                    libelleCourt: 'Boucher-charcutier / Bouchère-charcutière',
                    particulier: false,
                  },
                  {
                    code: '11570',
                    libelle: 'Boucher-traiteur / Bouchère-traiteuse',
                    libelleCourt: 'Boucher-traiteur / Bouchère-traiteuse',
                    particulier: false,
                  },
                  {
                    code: '11571',
                    libelle: 'Boucher-tripier / Bouchère-tripière',
                    libelleCourt: 'Boucher-tripier / Bouchère-tripière',
                    particulier: false,
                  },
                  {
                    code: '11572',
                    libelle: 'Boucher-volailler / Bouchère-volaillère',
                    libelleCourt: 'Boucher-volailler / Bouchère-volaillère',
                    particulier: false,
                  },
                  {
                    code: '17406',
                    libelle: 'Ouvrier boucher / Ouvrière bouchère',
                    libelleCourt: 'Ouvrier boucher / Ouvrière bouchère',
                    particulier: false,
                  },
                  {
                    code: '19351',
                    libelle: 'Second boucher / Seconde bouchère',
                    libelleCourt: 'Second boucher / Seconde bouchère',
                    particulier: false,
                  },
                ],
                code: 'D1101',
                codeIsco: '7511',
                competencesDeBase: [
                  {
                    code: '121945',
                    libelle: 'Réceptionner des carcasses de viande',
                    noeudCompetence: {
                      code: '00002',
                      libelle: 'Abattage et découpe de viande',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '124033',
                    libelle: 'Contrôler la qualité d\'un produit',
                    noeudCompetence: {
                      code: '00059',
                      libelle: 'Contrôle qualité',
                      racineCompetence: {
                        code: '00039',
                        libelle: 'Qualité',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '122688',
                    libelle: 'Préparer une carcasse aux opérations de découpe',
                    noeudCompetence: {
                      code: '00002',
                      libelle: 'Abattage et découpe de viande',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '118018',
                    libelle: 'Découper de la viande',
                    noeudCompetence: {
                      code: '00002',
                      libelle: 'Abattage et découpe de viande',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '123013',
                    libelle: 'Trier des pièces de viande',
                    noeudCompetence: {
                      code: '00002',
                      libelle: 'Abattage et découpe de viande',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '120224',
                    libelle: 'Détailler des pièces de viande',
                    noeudCompetence: {
                      code: '00002',
                      libelle: 'Abattage et découpe de viande',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '120220',
                    libelle: 'Conditionner des pièces de viande, des spécialités bouchères',
                    noeudCompetence: {
                      code: '00325',
                      libelle: 'Techniques de production alimentaire',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '117532',
                    libelle: 'Disposer des produits sur le lieu de vente',
                    noeudCompetence: {
                      code: '00186',
                      libelle: 'Merchandising',
                      racineCompetence: {
                        code: '00001',
                        libelle: 'Achat - vente',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '122330',
                    libelle: 'Renseigner un client',
                    noeudCompetence: {
                      code: '00366',
                      libelle: 'Relation client',
                      racineCompetence: {
                        code: '00001',
                        libelle: 'Achat - vente',
                      },
                    },
                    riasecMajeur: 'S',
                    riasecMineur: 'S',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '104304',
                    libelle: 'Prendre la commande des clients',
                    noeudCompetence: {
                      code: '00303',
                      libelle: 'Service en salle',
                      racineCompetence: {
                        code: '00010',
                        libelle: 'Cuisine - restauration',
                      },
                    },
                    riasecMajeur: 'E',
                    riasecMineur: 'C',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '124545',
                    libelle: 'Entretenir un espace de vente',
                    noeudCompetence: {
                      code: '00204',
                      libelle: 'Nettoyage - entretien de locaux',
                      racineCompetence: {
                        code: '00034',
                        libelle: 'Nettoyage - entretien',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '124547',
                    libelle: 'Nettoyer du matériel ou un équipement',
                    noeudCompetence: {
                      code: '00205',
                      libelle: 'Nettoyage - entretien de matériels et d\'installations',
                      racineCompetence: {
                        code: '00034',
                        libelle: 'Nettoyage - entretien',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '124548',
                    libelle: 'Entretenir un poste de travail',
                    noeudCompetence: {
                      code: '00204',
                      libelle: 'Nettoyage - entretien de locaux',
                      racineCompetence: {
                        code: '00034',
                        libelle: 'Nettoyage - entretien',
                      },
                    },
                    riasecMajeur: 'R',
                    riasecMineur: 'R',
                    typeCompetence: 'SavoirFaire',
                  },
                  {
                    code: '101718',
                    libelle: 'Techniques de désossage',
                    noeudCompetence: {
                      code: '00325',
                      libelle: 'Techniques de production alimentaire',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '101719',
                    libelle: 'Techniques de parage des viandes',
                    noeudCompetence: {
                      code: '00325',
                      libelle: 'Techniques de production alimentaire',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '116573',
                    libelle: 'Boucherie',
                    noeudCompetence: {
                      code: '00029',
                      libelle: 'Caractéristiques et types de produits alimentaires',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '101782',
                    libelle: 'Modes de cuisson des aliments',
                    noeudCompetence: {
                      code: '00252',
                      libelle: 'Préparations et réalisations culinaires',
                      racineCompetence: {
                        code: '00010',
                        libelle: 'Cuisine - restauration',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '121946',
                    libelle: 'Découpe de viande',
                    noeudCompetence: {
                      code: '00343',
                      libelle: 'Traitement et transformation des viandes',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '101716',
                    libelle: 'Chaîne du froid',
                    noeudCompetence: {
                      code: '00283',
                      libelle: 'Règlementation sanitaire - règles d\'hygiène',
                      racineCompetence: {
                        code: '00042',
                        libelle: 'Règlementation sanitaire - règles d\'hygiène',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '122410',
                    libelle: 'Stockage de produits alimentaires',
                    noeudCompetence: {
                      code: '00138',
                      libelle: 'Gestion des stocks et inventaires',
                      racineCompetence: {
                        code: '00029',
                        libelle: 'Logistique',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '100359',
                    libelle: 'Règles d\'hygiène et de sécurité alimentaire',
                    noeudCompetence: {
                      code: '00283',
                      libelle: 'Règlementation sanitaire - règles d\'hygiène',
                      racineCompetence: {
                        code: '00042',
                        libelle: 'Règlementation sanitaire - règles d\'hygiène',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '100429',
                    libelle: 'Anatomie animale',
                    noeudCompetence: {
                      code: '00035',
                      libelle: 'Chirurgie animale',
                      racineCompetence: {
                        code: '00046',
                        libelle: 'Santé animale',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '100259',
                    libelle: 'Utilisation de matériel de nettoyage',
                    noeudCompetence: {
                      code: '00327',
                      libelle: 'Techniques et matériel de nettoyage',
                      racineCompetence: {
                        code: '00034',
                        libelle: 'Nettoyage - entretien',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '101720',
                    libelle: 'Techniques d\'embossage de viande',
                    noeudCompetence: {
                      code: '00325',
                      libelle: 'Techniques de production alimentaire',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '101715',
                    libelle: 'Ficelage des viandes',
                    noeudCompetence: {
                      code: '00251',
                      libelle: 'Préparations alimentaires',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '100143',
                    libelle: 'Traçabilité des produits',
                    noeudCompetence: {
                      code: '00071',
                      libelle: 'Démarche qualité',
                      racineCompetence: {
                        code: '00039',
                        libelle: 'Qualité',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                  {
                    code: '119525',
                    libelle: 'Techniques de transformation des viandes',
                    noeudCompetence: {
                      code: '00325',
                      libelle: 'Techniques de production alimentaire',
                      racineCompetence: {
                        code: '00003',
                        libelle: 'Agroalimentaire et métiers de bouche',
                      },
                    },
                    typeCompetence: 'Savoir',
                  },
                ],
                condition: 'L\'activité de cet emploi/métier s\'exerce au sein de boucheries, de boucheries-charcuteries, aux rayons boucherie de grandes et moyennes surfaces, sur les marchés, en contact avec les clients, en relation avec les fournisseurs, le responsable de rayon et différents services (livraisons, services vétérinaires, services d\'hygiène).\\nElle varie selon la structure (entreprise artisanale, hypermarché, ...).\\nElle peut s\'exercer les fins de semaine.\\nL\'activité s\'effectue en laboratoire, en magasin et peut impliquer le port de charges et la station debout prolongée.\\nLe port d\'équipement de protection (tablier, chaussures de sécurité, ...) peut être requis.',
                definition: 'Réalise les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires.\\nPeut effectuer la vente de produits de boucherie.\\nPeut gérer un commerce de détail alimentaire (boucherie, boucherie-charcuterie, ...).',
                domaineProfessionnel: {
                  code: 'D11',
                  grandDomaine: {
                    code: 'D',
                    libelle: 'Commerce, Vente et Grande distribution',
                  },
                  libelle: 'Commerce alimentaire et métiers de bouche',
                },
                environnementsTravail: [
                  {
                    code: '23401',
                    libelle: 'Armée',
                    typeEnvironnementTravail: 'Secteur',
                  },
                  {
                    code: '23721',
                    libelle: 'Boucherie',
                    typeEnvironnementTravail: 'Structure',
                  },
                  {
                    code: '23722',
                    libelle: 'Boucherie-charcuterie',
                    typeEnvironnementTravail: 'Structure',
                  },
                  {
                    code: '23967',
                    libelle: 'Hypermarché (2500 m² et +)',
                    typeEnvironnementTravail: 'Structure',
                  },
                  {
                    code: '24005',
                    libelle: 'Marché, foire exposition',
                    typeEnvironnementTravail: 'Structure',
                  },
                  {
                    code: '24116',
                    libelle: 'Supermarché (400 à 2500m²)',
                    typeEnvironnementTravail: 'Structure',
                  },
                  {
                    code: '24844',
                    libelle: 'Travail en indépendant',
                    typeEnvironnementTravail: 'Condition',
                  },
                ],
                groupesCompetencesSpecifiques: [
                  {
                    competences: [
                      {
                        code: '126218',
                        libelle: 'Découper, désosser, parer de l\'agneau',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '126258',
                        libelle: 'Découper, désosser, parer du boeuf',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '126416',
                        libelle: 'Découper, désosser, parer du cheval',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '126080',
                        libelle: 'Découper, désosser, parer du gibier, des viandes exotiques',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '126417',
                        libelle: 'Découper, désosser, parer du lapin',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '126241',
                        libelle: 'Découper, désosser, parer du mouton',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '126197',
                        libelle: 'Découper, désosser, parer du porc',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '126242',
                        libelle: 'Découper, désosser, parer du veau',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '126243',
                        libelle: 'Découper, désosser, parer des volailles',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                    ],
                  },
                  {
                    competences: [
                      {
                        code: '120230',
                        libelle: 'Préparer des plats cuisinés',
                        noeudCompetence: {
                          code: '00252',
                          libelle: 'Préparations et réalisations culinaires',
                          racineCompetence: {
                            code: '00010',
                            libelle: 'Cuisine - restauration',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '119443',
                        libelle: 'Cuisiner des produits de charcuterie',
                        noeudCompetence: {
                          code: '00275',
                          libelle: 'Réalisations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '119442',
                        libelle: 'Cuisiner des produits de rôtisserie',
                        noeudCompetence: {
                          code: '00275',
                          libelle: 'Réalisations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '119444',
                        libelle: 'Cuisiner des produits tripiers',
                        noeudCompetence: {
                          code: '00275',
                          libelle: 'Réalisations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '119441',
                        libelle: 'Cuisiner des spécialités bouchères',
                        noeudCompetence: {
                          code: '00275',
                          libelle: 'Réalisations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '119438',
                        libelle: 'Cuisiner des viandes',
                        noeudCompetence: {
                          code: '00252',
                          libelle: 'Préparations et réalisations culinaires',
                          racineCompetence: {
                            code: '00010',
                            libelle: 'Cuisine - restauration',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '119503',
                        libelle: 'Préparations culinaires de base',
                        noeudCompetence: {
                          code: '00252',
                          libelle: 'Préparations et réalisations culinaires',
                          racineCompetence: {
                            code: '00010',
                            libelle: 'Cuisine - restauration',
                          },
                        },
                        typeCompetence: 'Savoir',
                      },
                    ],
                  },
                  {
                    competences: [
                      {
                        code: '123014',
                        libelle: 'Sélectionner une bête auprès d\'un producteur',
                        noeudCompetence: {
                          code: '00002',
                          libelle: 'Abattage et découpe de viande',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'E',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '100038',
                        libelle: 'Chiffrage/calcul de coût',
                        noeudCompetence: {
                          code: '00172',
                          libelle: 'Manipulation de chiffres des ordres de grandeur',
                          racineCompetence: {
                            code: '00007',
                            libelle: 'Compétences transverses',
                          },
                        },
                        typeCompetence: 'Savoir',
                      },
                    ],
                  },
                  {
                    competences: [
                      {
                        code: '114110',
                        libelle: 'Vider et nettoyer des bêtes',
                        noeudCompetence: {
                          code: '00251',
                          libelle: 'Préparations alimentaires',
                          racineCompetence: {
                            code: '00003',
                            libelle: 'Agroalimentaire et métiers de bouche',
                          },
                        },
                        riasecMajeur: 'R',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                    ],
                  },
                  {
                    competences: [
                      {
                        code: '122183',
                        libelle: 'Vendre des produits ou services',
                        noeudCompetence: {
                          code: '00361',
                          libelle: 'Vente',
                          racineCompetence: {
                            code: '00001',
                            libelle: 'Achat - vente',
                          },
                        },
                        riasecMajeur: 'E',
                        riasecMineur: 'E',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '100340',
                        libelle: 'Techniques de vente',
                        noeudCompetence: {
                          code: '00361',
                          libelle: 'Vente',
                          racineCompetence: {
                            code: '00001',
                            libelle: 'Achat - vente',
                          },
                        },
                        typeCompetence: 'Savoir',
                      },
                      {
                        code: '100341',
                        libelle: 'Procédures d\'encaissement',
                        noeudCompetence: {
                          code: '00331',
                          libelle: 'Tenue de caisse',
                          racineCompetence: {
                            code: '00001',
                            libelle: 'Achat - vente',
                          },
                        },
                        typeCompetence: 'Savoir',
                      },
                    ],
                  },
                  {
                    competences: [
                      {
                        code: '116932',
                        libelle: 'Suivre l\'état des stocks',
                        noeudCompetence: {
                          code: '00138',
                          libelle: 'Gestion des stocks et inventaires',
                          racineCompetence: {
                            code: '00029',
                            libelle: 'Logistique',
                          },
                        },
                        riasecMajeur: 'C',
                        riasecMineur: 'C',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '125971',
                        libelle: 'Définir des besoins en approvisionnement',
                        noeudCompetence: {
                          code: '00134',
                          libelle: 'Gestion des commandes',
                          racineCompetence: {
                            code: '00029',
                            libelle: 'Logistique',
                          },
                        },
                        riasecMajeur: 'C',
                        riasecMineur: 'C',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '119860',
                        libelle: 'Préparer les commandes',
                        noeudCompetence: {
                          code: '00134',
                          libelle: 'Gestion des commandes',
                          racineCompetence: {
                            code: '00029',
                            libelle: 'Logistique',
                          },
                        },
                        riasecMajeur: 'C',
                        riasecMineur: 'R',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '119000',
                        libelle: 'Gestion des stocks et des approvisionnements',
                        noeudCompetence: {
                          code: '00138',
                          libelle: 'Gestion des stocks et inventaires',
                          racineCompetence: {
                            code: '00029',
                            libelle: 'Logistique',
                          },
                        },
                        typeCompetence: 'Savoir',
                      },
                    ],
                  },
                  {
                    competences: [
                      {
                        code: '124318',
                        libelle: 'Réaliser une gestion comptable',
                        noeudCompetence: {
                          code: '00143',
                          libelle: 'Gestion et contrôles comptables',
                          racineCompetence: {
                            code: '00008',
                            libelle: 'Comptabilité - contrôle de gestion - audit',
                          },
                        },
                        riasecMajeur: 'C',
                        riasecMineur: 'C',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '124377',
                        libelle: 'Réaliser une gestion administrative',
                        noeudCompetence: {
                          code: '00341',
                          libelle: 'Traitement des opérations administratives et financières',
                          racineCompetence: {
                            code: '00007',
                            libelle: 'Compétences transverses',
                          },
                        },
                        riasecMajeur: 'C',
                        riasecMineur: 'C',
                        typeCompetence: 'SavoirFaire',
                      },
                      {
                        code: '120886',
                        libelle: 'Logiciels comptables',
                        noeudCompetence: {
                          code: '00005',
                          libelle: 'Actes comptables',
                          racineCompetence: {
                            code: '00008',
                            libelle: 'Comptabilité - contrôle de gestion - audit',
                          },
                        },
                        typeCompetence: 'Savoir',
                      },
                      {
                        code: '120889',
                        libelle: 'Gestion administrative',
                        noeudCompetence: {
                          code: '00341',
                          libelle: 'Traitement des opérations administratives et financières',
                          racineCompetence: {
                            code: '00007',
                            libelle: 'Compétences transverses',
                          },
                        },
                        typeCompetence: 'Savoir',
                      },
                      {
                        code: '120888',
                        libelle: 'Gestion comptable',
                        noeudCompetence: {
                          code: '00143',
                          libelle: 'Gestion et contrôles comptables',
                          racineCompetence: {
                            code: '00008',
                            libelle: 'Comptabilité - contrôle de gestion - audit',
                          },
                        },
                        typeCompetence: 'Savoir',
                      },
                    ],
                  },
                  {
                    competences: [
                      {
                        code: '113954',
                        libelle: 'Transmettre les techniques du métier ou mener des actions de sensibilisation au métier',
                        noeudCompetence: {
                          code: '00017',
                          libelle: 'Animation de formation et coaching',
                          racineCompetence: {
                            code: '00017',
                            libelle: 'Enseignement - formation - orientation',
                          },
                        },
                        riasecMajeur: 'S',
                        riasecMineur: 'S',
                        typeCompetence: 'SavoirFaire',
                      },
                    ],
                  },
                ],
                libelle: 'Boucherie',
                mobilitesEvolutionsAppellationsVersAppellations: [],
                mobilitesEvolutionsAppellationsVersMetiers: [],
                mobilitesEvolutionsVersAppellations: [
                  {
                    appellationCible: {
                      code: '16741',
                      libelle: 'Moniteur / Monitrice en centre de formation d\'apprentis',
                      libelleCourt: 'Moniteur / Monitrice en centre de formation d\'apprentis',
                      metier: {
                        code: 'K2109',
                        libelle: 'Enseignement technique et professionnel',
                      },
                    },
                  },
                  {
                    appellationCible: {
                      code: '11388',
                      libelle: 'Attaché commercial / Attachée commerciale grandes et moyennes surfaces de vente (GMS)',
                      libelleCourt: 'Attaché(e) commercial(e) grandes, moyennes surfaces de vente',
                      metier: {
                        code: 'D1402',
                        libelle: 'Relation commerciale grands comptes et entreprises',
                      },
                    },
                  },
                ],
                mobilitesEvolutionsVersMetiers: [
                  {
                    metierCible: {
                      code: 'D1502',
                      libelle: 'Management/gestion de rayon produits alimentaires',
                    },
                  },
                  {
                    metierCible: {
                      code: 'D1301',
                      libelle: 'Management de magasin de détail',
                    },
                  },
                  {
                    metierCible: {
                      code: 'D1103',
                      libelle: 'Charcuterie - traiteur',
                    },
                  },
                ],
                mobilitesProchesAppellationsVersAppellations: [],
                mobilitesProchesAppellationsVersMetiers: [],
                mobilitesProchesVersAppellations: [],
                mobilitesProchesVersMetiers: [
                  {
                    metierCible: {
                      code: 'D1107',
                      libelle: 'Vente en gros de produits frais',
                    },
                  },
                  {
                    metierCible: {
                      code: 'D1106',
                      libelle: 'Vente en alimentation',
                    },
                  },
                ],
                particulier: false,
                riasecMajeur: 'R',
                riasecMineur: 'E',
                themes: [],
              },
              rythmeAlternance: '2 semaines / 3 semaines',
            },
            lastUpdateAt: '2022-05-22T16:32:39.319Z',
            longTitle: null,
            nafs: [
              {
                label: 'Commerce de détail de viandes et de produits à base de viande en magasin spécialisé',
              },
            ],
            onisepUrl: null,
            period: null,
            place: {
              address: '77 RUE DES BOURGUIGNONS 92270 BOIS-COLOMBES',
              cedex: null,
              city: null,
              departementNumber: null,
              distance: 298.9,
              fullAddress: '77 RUE DES BOURGUIGNONS 92270 BOIS-COLOMBES',
              insee: null,
              latitude: '48.915675',
              longitude: '2.27597',
              region: null,
              zipCode: null,
            },
            rncpCode: null,
            rncpEligibleApprentissage: null,
            rncpLabel: null,
            romes: [
              {
                code: 'D1101',
              },
            ],
            title: 'Boucherie',
            training: null,
            url: null,
          },
        ],
      },
      peJobs: {
        results: [
          {
            capacity: null,
            cfd: null,
            company: {
              logo: 'https://entreprise.pole-emploi.fr/static/img/logos/Oukw265FRpXdejCSFnIkDoqQujqGiEt4.png',
              name: 'AUCHAN SUPERMARCHE',
            },
            contact: {
              email: 'Pour postuler, utiliser le lien suivant : https://candidat.pole-emploi.fr/offres/recherche/detail/134CMXJ',
              info: 'Pour postuler, utiliser le lien suivant : https://candidat.pole-emploi.fr/offres/recherche/detail/134CMXJ',
              name: 'AUCHAN SUPERMARCHE - Mme BROUSSE',
            },
            createdAt: null,
            diploma: null,
            diplomaLevel: null,
            id: null,
            ideaType: 'peJob',
            job: {
              contractDescription: 'Contrat à durée déterminée - 24 Mois',
              contractType: 'CDD',
              creationDate: '2022-05-23T16:13:36.000Z',
              description: 'Vos missions principales :\n \n- Réaliser les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires. \n- Effectuer la vente de produits de boucherie.',
              duration: '35H Travail en équipe',
              id: '134CMXJ',
            },
            lastUpdateAt: null,
            longTitle: null,
            nafs: null,
            onisepUrl: null,
            period: null,
            place: {
              city: '15 - AURILLAC',
              distance: 0,
              fullAddress: '15 - AURILLAC 15000',
              insee: '15014',
              latitude: 44.919226,
              longitude: 2.434201,
              zipCode: '15000',
            },
            rncpCode: null,
            rncpEligibleApprentissage: null,
            rncpLabel: null,
            romes: [
              {
                code: 'D1101',
              },
            ],
            title: 'APPRENTI (E) BOUCHER (ERE) (H/F)',
            training: null,
            url: 'https://candidat.pole-emploi.fr/offres/recherche/detail/134CMXJ',
          },
          {
            capacity: null,
            cfd: null,
            company: {
              name: 'SUPERMARCHE MATCH',
            },
            contact: {
              info: 'ZA LES TERRASSES DE LA SARRE 2 BIS TERRASSE DE BRETAGNE\n57400 SARREBOURG\nPour postuler, utiliser le lien suivant : https://candidat.pole-emploi.fr/offres/recherche/detail/134BYGN',
              name: 'Pôle Emploi SARREBOURG',
            },
            createdAt: null,
            diploma: null,
            diplomaLevel: null,
            id: null,
            ideaType: 'peJob',
            job: {
              contractDescription: 'Contrat à durée déterminée - 24 Mois',
              contractType: 'CDD',
              creationDate: '2022-05-23T13:55:26.000Z',
              description: 'Nous sommes à la recherche d\'un(e) apprenti(e) boucher(ère) dans le cadre d\'un CAP.\n\nVous serez formé(e)  entre un centre de formation des apprentis et un employeur.\n\n Passionné(e) par l\'univers de la boucherie, vous souhaitez en faire votre métier, nous sommes prêts à vous former !',
              duration: '35H Horaires normaux',
              id: '134BYGN',
            },
            lastUpdateAt: null,
            longTitle: null,
            nafs: null,
            onisepUrl: null,
            period: null,
            place: {
              city: '57 - CHATEAU SALINS',
              distance: 0,
              fullAddress: '57 - CHATEAU SALINS 57170',
              insee: '57132',
              latitude: 48.820539,
              longitude: 6.501427,
              zipCode: '57170',
            },
            rncpCode: null,
            rncpEligibleApprentissage: null,
            rncpLabel: null,
            romes: [
              {
                code: 'D1101',
              },
            ],
            title: 'Apprenti/e boucher/ère (H/F)',
            training: null,
            url: 'https://candidat.pole-emploi.fr/offres/recherche/detail/134BYGN',
          },
        ],
      },
    },
  );
}
