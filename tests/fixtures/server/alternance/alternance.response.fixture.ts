import {
  AlternanceResponse,
} from '~/server/alternances/infra/repositories/responses/alternanceResponse.type';
import { MatchasResultResponse } from '~/server/alternances/infra/repositories/responses/matchasResponse.type';
import { PeJobsResultResponse } from '~/server/alternances/infra/repositories/responses/peJobsResponse.type';
import {
  RechercheMetierResponse,
} from '~/server/alternances/infra/repositories/responses/rechercheMetierResponse.type';

export function aLaBonneAlternanceResponse(): AlternanceResponse {
  return {
    matchas: {
      results: [
        {
          company: {
            logo: 'logo',
            name: 'BOUCHERIE PLAISANCE',
          },
          contact: {
            name: 'zahir oubouzar',
            phone: '0636145060',
          },
          diplomaLevel: 'Cap, autres formations niveau (Infrabac)',
          ideaType: 'matcha',
          job: {
            contractType: [
              'Apprentissage',
              'Professionnalisation',
            ],
            dureeContrat: 1,
            id: '62c98502d2f6710027072c30',
            jobStartDate: '2022-09-01T00:00:00.000Z',
            rythmeAlternance: '2 semaines / 3 semaines',
          },
          place: {
            fullAddress: '8 AV MONTAIGNE 31830 PLAISANCE-DU-TOUCH',
          },
          title: 'Boucherie',
        },
      ],
    },
    peJobs: {
      results: [
        {
          company: {
            logo: 'https://entreprise.pole-emploi.fr/static/img/logos/MYKCWy4RJwtb7tofHjEAub6WAAlRBvuM.png',
            name: 'LES HALLES DE L\'AVEYRON',
          },
          contact: {
            name: 'LES HALLES DE L\'AVEYRON - M. MATTHIEU JOULIA',
          },
          ideaType: 'peJob',
          job: {
            contractDescription: 'Contrat à durée déterminée - 24 Mois',
            contractType: 'CDD',
            description: 'Nous recherchons pour notre magasin de Issy-les-Moulineaux un(e) Apprenti(e) Boucher.\n\n\nVos missions : \n-\tAssurer les tâches de découpe, préparation et transformation des produits ; \n-\tVeiller à la présentation et rotation des produits ;\n-\tAccueillir, conseiller et servir les clients conformément à la charte HDA ;\n-\tVeiller à la propreté des linéaires, laboratoires, chambres froides, matériels et outils d\'aide à la vente ;\n-\tAssurer le bon déroulement de la chaîne du froid ;\n-\tAssurer et renseigner les documents de traçabilité ;\n-\tApplication des règles d\'hygiène.\n\n\n\nVotre profil :\n\n-\tDiplôme en Boucherie et expérience préparée ;\n-\tConnaissance des méthodes de découpe et de conservation ;\n-\tConnaissance des règles d\'hygiène et rigueur ;\n-\tQualités commerciales et sens du service client ;',
            duration: '35H Horaires normaux',
            id: '135GXSV',
          },
          place: {
            city: '92 - ISSY LES MOULINEAUX',
            fullAddress: '92 - ISSY LES MOULINEAUX 92130',
          },
          title: 'Apprenti(e) Boucher / Bouchère  (H/F)',
          url: 'https://candidat.pole-emploi.fr/offres/recherche/detail/135GXSV',
        },
      ],
    },
  };
}

export function aMétierRechercheList(): RechercheMetierResponse {
  return {
    labelsAndRomes: [
      {
        label: 'Electricité, climatisation, domotique, électronique',
        romes: ['F1106'],
      },
      {
        label: 'Génie électrique',
        romes: ['H1209'],
      },
    ],
  };
}

export function aResultOffreFromMatcha(): MatchasResultResponse {
  return {
    company: {
      logo: 'logo',
      name: 'BOUCHERIE PLAISANCE',
    },
    contact: {
      name: 'zahir oubouzar',
      phone: '0636145060',
    },
    diplomaLevel: 'Cap, autres formations niveau (Infrabac)',
    ideaType: 'matcha',
    job: {
      contractType: [
        'Apprentissage',
        'Professionnalisation',
      ],
      dureeContrat: 1,
      id: '62c98502d2f6710027072c30',
      jobStartDate: '2022-09-01T00:00:00.000Z',
      romeDetails: {
        competencesDeBase: [
          {
            libelle: "Définir le plan d'action commercial et établir le plan de tournée (ciblage, interlocuteurs, préparation de dossiers techniques)",
          },
          {
            libelle: 'Concevoir une étude de faisabilité technique',
          },
          {
            libelle: 'Établir un devis',
          },
          {
            libelle: 'Négocier un contrat',
          },
        ],
        definition: 'Prospecte une clientèle de professionnels, propose des solutions techniques selon les besoins, impératifs du client et négocie les conditions commerciales de la vente.\\nPeut coordonner une équipe commerciale et animer un réseau de commerciaux.',
      },
      rythmeAlternance: '2 semaines / 3 semaines',
    },
    place: {
      fullAddress: '8 AV MONTAIGNE 31830 PLAISANCE-DU-TOUCH',
    },
    title: 'Boucherie',
  }
  ;
}

export function aResultOffreFromPeJob(): PeJobsResultResponse {
  return {
    company: {
      logo: 'https://entreprise.pole-emploi.fr/static/img/logos/MYKCWy4RJwtb7tofHjEAub6WAAlRBvuM.png',
      name: 'LES HALLES DE L\'AVEYRON',
    },
    contact: {
      name: 'LES HALLES DE L\'AVEYRON - M. MATTHIEU JOULIA',
    },
    ideaType: 'peJob',
    job: {
      contractDescription: 'Contrat à durée déterminée - 24 Mois',
      contractType: 'CDD',
      description: 'Nous recherchons pour notre magasin de Issy-les-Moulineaux un(e) Apprenti(e) Boucher.\n\n\nVos missions : \n-\tAssurer les tâches de découpe, préparation et transformation des produits ; \n-\tVeiller à la présentation et rotation des produits ;\n-\tAccueillir, conseiller et servir les clients conformément à la charte HDA ;\n-\tVeiller à la propreté des linéaires, laboratoires, chambres froides, matériels et outils d\'aide à la vente ;\n-\tAssurer le bon déroulement de la chaîne du froid ;\n-\tAssurer et renseigner les documents de traçabilité ;\n-\tApplication des règles d\'hygiène.\n\n\n\nVotre profil :\n\n-\tDiplôme en Boucherie et expérience préparée ;\n-\tConnaissance des méthodes de découpe et de conservation ;\n-\tConnaissance des règles d\'hygiène et rigueur ;\n-\tQualités commerciales et sens du service client ;',
      duration: '35H Horaires normaux',
      id: '135GXSV',
    },
    place: {
      city: '92 - ISSY LES MOULINEAUX',
      fullAddress: '92 - ISSY LES MOULINEAUX 92130',
    },
    title: 'Apprenti(e) Boucher / Bouchère  (H/F)',
    url: 'https://candidat.pole-emploi.fr/offres/recherche/detail/135GXSV',
  };
}
