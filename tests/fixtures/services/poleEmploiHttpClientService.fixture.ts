import { anAxiosInstance, anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';
import { AxiosResponse } from 'axios';

import {
  OffreEmploiResponse,
  RésultatsRechercheOffreEmploiResponse,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.response';
import { PoleEmploiHttpClientService } from '~/server/services/http/poleEmploiHttpClient.service';

export function aPoleEmploiHttpClient(): PoleEmploiHttpClientService {
  return {
    client: anAxiosInstance(),
    get: jest.fn(),
    post: jest.fn(),
    refreshToken: jest.fn(),
    setAuthorizationHeader: jest.fn(),
  } as unknown as PoleEmploiHttpClientService;
}

export function aRésultatRechercheOffreEmploiAxiosResponse(override?: Partial<RésultatsRechercheOffreEmploiResponse>): AxiosResponse<RésultatsRechercheOffreEmploiResponse> {
  return anAxiosResponse({
    filtresPossibles: aFiltresPossiblesResponse(),
    resultats: [
      aBarmanOffreEmploiResponse(),
      aMaçonOffreEmploiResponse(),
      aValetOffreEmploiResponse(),
    ],
    ...override,
  });
}

export function aRésultatRéférentielCommuneResponse() {
  return anAxiosResponse([
    {
      code: '76322',
      codeDepartement: '76',
      codePostal: '76120',
      libelle: 'LE GRAND QUEVILLY',
    },
    {
      code: '44109',
      codeDepartement: '44',
      codePostal: '44000',
      libelle: 'NANTES',
    },
    {
      code: '76615',
      codeDepartement: '76',
      codePostal: '76133',
      libelle: 'ST MARTIN DU BEC',
    },
    {
      code: '75101',
      codeDepartement: '75',
      codePostal: '75001',
      libelle: 'PARIS 01',
    },
  ]);
}

export function aBarmanOffreEmploiAxiosResponse(): AxiosResponse<OffreEmploiResponse> {
  return anAxiosResponse(aBarmanOffreEmploiResponse());
}

function aBarmanOffreEmploiResponse(): OffreEmploiResponse {
  return {
    description: 'Nous recherchons pour la saison demi-mai à mi-octobre 2022 un(e) Barman h/f.\n\nVos missions principales: \n- Vous effectuez le service au comptoir, en salle, en terrasse, de boissons chaudes ou froides selon la législation relative à la consommation d\'alcools. \n- Vous entretenez la verrerie, les équipements du bar et les locaux selon les règles d\'hygiène et la réglementation  en vigueur.\n- Vous participez à la vie de la paillote. \n \nVous travaillez vendredi et samedi. \n\n\n',
    dureeTravailLibelleConverti: 'Temps partiel',
    entreprise: {
      logo: undefined,
      nom: 'LE PLEIN AIR',
    },
    experienceExige: 'D',
    formations: [
      { commentaire: 'Bac Pro Automobile',
        niveauLibelle: 'Bac ou équivalent' },
      { commentaire: 'Bac Pro Moto',
        niveauLibelle: 'Bac ou supérieur' },
    ],
    id: '132LKFB',
    intitule: 'Barman / Barmaid (H/F)',
    lieuTravail: {
      libelle: '26 - BOURG LES VALENCE',
    },
    origineOffre: {
      urlOrigine: 'https://candidat.pole-emploi.fr/offres/recherche/detail/132LKFB',
    },
    typeContrat: 'SAI',
  };
}

function aMaçonOffreEmploiResponse(): OffreEmploiResponse {
  return {
    description: 'Vous recherchez un emploi ? Faites confiances à nos différences ! R.A.S Intérim, réseau d\'agences d\'emploi de 170 agences, propose des centaines d\'opportunités d\'emploi dans tous les secteurs d\'activité, en intérim, CDD et CDI.\n\nVotre Agence R.A.S Intérim de PORNIC, recherche un MACON dans pour un de ses clients spécialiste du BTP.\n\nVos missions:\n- Travaux de maçonnerie\n- Travaux sur différents matériaux (parpaings, brique...)\n- Lecture de plans\n\nVotre profil:\n- Titulaire d\'un CAP maçonnerie\n- Expérience sur un poste similaire\n- Rigueur/ Autonome\n\nDisponible? Envoyez nous votre CV !',
    dureeTravailLibelleConverti: 'Temps partiel',
    entreprise: {
      logo: 'https://entreprise.pole-emploi.fr/static/img/logos/Oukw265FRpXdejCSFnIkDoqQujqGiEt4.png',
      nom: 'RAS 1040',
    },
    experienceExige: 'E',
    formations:[
      { commentaire: 'Bac pro Maçon',
        niveauLibelle: 'Bac ou supérieur' },
    ],
    id: '130WPHC',
    intitule: 'Maçon / Maçonne',
    lieuTravail: undefined,
    origineOffre: {
      urlOrigine: 'https://candidat.pole-emploi.fr/offres/recherche/detail/130WPHC',
    },
    typeContrat: 'MIS',
  };
}

function aValetOffreEmploiResponse(): OffreEmploiResponse {
  return {
    description: 'Vous interviendrez sur le nettoyage des chambres de l\'Hôtel.\nVous changerez les draps et serviettes, nettoierez la salle de bain et les sanitaires, effectuerez la poussière et passerez l\'aspirateur.  \n\nNous vous proposons un contrat en vacation, vous devez pouvoir être disponible les weekend. 3 à 4 vacations par semaine.\nLa durée du contrat et le nombre d\'heure varieront en fonction des nécessites du service; c\'est à dire de 20 h à 24h de travail par semaine.\n\nPrise de poste au plus tôt.\n',
    dureeTravailLibelleConverti: 'Temps partiel',
    entreprise: undefined,
    experienceExige: 'S',
    id: '132MDKM',
    intitule: 'Valet / Femme de chambre',
    lieuTravail: {
      libelle: '34 - BALARUC LES BAINS',
    },
    origineOffre: {
      urlOrigine: 'https://candidat.pole-emploi.fr/offres/recherche/detail/132MDKM',
    },
    typeContrat: 'CDD',
  };
}

function aFiltresPossiblesResponse(): RésultatsRechercheOffreEmploiResponse.FiltresPossibles[] {
  return [
    {
      agregation: [
        {
          nbResultats: 3,
        },
      ],
    },
    {
      agregation: [
        {
          nbResultats: 3,
        },
      ],
    },
    {
      agregation: [
        {
          nbResultats: 1,
        },
        {
          nbResultats: 2,
        },
      ],
    },
    {
      agregation: [
        {
          nbResultats: 1,
        },
        {
          nbResultats: 2,
        },
      ],
    },
  ];
}
