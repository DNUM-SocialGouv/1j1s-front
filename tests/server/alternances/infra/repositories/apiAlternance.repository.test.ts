import { aMétierList, anApprentiBoucherFromMatcha } from '@tests/fixtures/domain/alternance.fixture';
import { aRésultatsRechercheOffreEmploi } from '@tests/fixtures/domain/offreEmploi.fixture';
import { aLaBonneAlternanceHttpClient } from '@tests/fixtures/services/laBonneAlternanceHttpClientService.fixture';

import {
  ApiAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiAlternance.repository';
import {
  mapMétierRecherchéList,
  mapOffreAlternanceMatcha,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import { AlternanceMatchasResponse } from '~/server/alternances/infra/repositories/responses/alternanceResponse.type';
import { createFailure, createSuccess, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import { ApiPoleEmploiOffreRepository } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.repository';
import { HttpClientService } from '~/server/services/http/httpClient.service';


jest.mock('axios', () => {
  return {
    isAxiosError: jest.fn().mockReturnValue(true),
  };
});

describe('ApiAlternanceRepository utilise LaBonneAlternance et Pole Emploi', () => {
  let apiAlternanceRepository: ApiAlternanceRepository;
  let httpClientService: HttpClientService;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const mockApiPoleEmploiOffreRepository: ApiPoleEmploiOffreRepository = {
    searchOffreEmploi: jest.fn(),
  };

  beforeEach(() => {
    httpClientService = aLaBonneAlternanceHttpClient();
    apiAlternanceRepository = new ApiAlternanceRepository(
      httpClientService,
      mockApiPoleEmploiOffreRepository,
    );
  });

  describe('getMétierRecherchéList', () => {
    describe('quand l api répond avec un success', () => {
      it('retourne la liste des métiers recherchés filtrée de l\'api la bonne alternance, insensiblement à la casse', async () => {
        jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aMétierList()));

        const result = await apiAlternanceRepository.getMétierRecherchéList('énergie');

        expect(httpClientService.get).toHaveBeenCalledWith('metiers?title=energie', mapMétierRecherchéList);
        expect([
          {
            codeROMEList: ['H1302', 'H1206', 'H2502', 'H1102', 'I1102', 'H1502', 'H1504', 'H1209', 'H1402', 'F1203', 'I1302', 'I1304', 'F1401', 'F1402', 'H2701'],
            intitulé: 'Energie',
          },
          {
            codeROMEList: ['I1307'],
            intitulé: 'Installation et maintenance réseaux telecom et énergie',
          },
        ]).toEqual(result);
      });
    });

    describe('quand l api répond avec une failure', () => {
      it('retourne une liste vide', async () => {
        jest.spyOn(httpClientService, 'get').mockResolvedValue(createFailure(ErreurMétier.CONTENU_INDISPONIBLE));

        const result = await apiAlternanceRepository.getMétierRecherchéList('bou');

        expect(httpClientService.get).toHaveBeenCalledWith('metiers?title=bou', mapMétierRecherchéList);
        expect([]).toEqual(result);
      });
    });
  });

  describe('quand on appelle l’api avec 3 codes romes', () => {
    it('on ne fait qu’un appel et on revoie le résultat', async () => {
      jest.spyOn(mockApiPoleEmploiOffreRepository, 'searchOffreEmploi').mockResolvedValue(createSuccess(aRésultatsRechercheOffreEmploi()));

      const result = await apiAlternanceRepository.searchAlternance({
        code: '75056',
        codeRomeList: ['C1203','C1206','C1102','C1109','C1110','C1201','C1205','C1401','C1104','C1207'],
        latitude: '48.859',
        longitude: '2.347',
      });

      expect(result).toEqual({
        nombreRésultats: 3,
        résultats: [
          {
            adresse: undefined,
            contact: undefined,
            description: 'Nous recherchons pour la saison demi-mai à mi-octobre 2022 un(e) Barman h/f.\n\nVos missions principales: \n- Vous effectuez le service au comptoir, en salle, en terrasse, de boissons chaudes ou froides selon la législation relative à la consommation d\'alcools. \n- Vous entretenez la verrerie, les équipements du bar et les locaux selon les règles d\'hygiène et la réglementation  en vigueur.\n- Vous participez à la vie de la paillote. \n \nVous travaillez vendredi et samedi. \n\n\n',
            entreprise: undefined,
            from: 'peJob',
            id: '132LKFB',
            intitulé: 'Barman / Barmaid (H/F)',
            niveauRequis: undefined,
            typeDeContrats: ['Contrat apprentissage'],
            ville: 'BOURG LES VALENCE (26)',
            étiquetteList: ['BOURG LES VALENCE (26)', 'Débutant accepté', 'Saisonnier', 'Temps partiel'],
          },
          {
            adresse: undefined,
            contact: undefined,
            description: 'Vous recherchez un emploi ? Faites confiances à nos différences ! R.A.S Intérim, réseau d\'agences d\'emploi de 170 agences, propose des centaines d\'opportunités d\'emploi dans tous les secteurs d\'activité, en intérim, CDD et CDI.\n\nVotre Agence R.A.S Intérim de PORNIC, recherche un MACON dans pour un de ses clients spécialiste du BTP.\n\nVos missions:\n- Travaux de maçonnerie\n- Travaux sur différents matériaux (parpaings, brique...)\n- Lecture de plans\n\nVotre profil:\n- Titulaire d\'un CAP maçonnerie\n- Expérience sur un poste similaire\n- Rigueur/ Autonome\n\nDisponible? Envoyez nous votre CV !',
            entreprise: undefined,
            from: 'peJob',
            id: '130WPHC',
            intitulé: 'Maçon / Maçonne',
            niveauRequis: undefined,
            typeDeContrats: ['Contrat apprentissage'],
            ville: undefined,
            étiquetteList: ['Expérience exigée', 'Intérim', 'Temps partiel'],
          },
          {
            adresse: undefined,
            contact: undefined,
            description: 'Vous interviendrez sur le nettoyage des chambres de l\'Hôtel.\nVous changerez les draps et serviettes, nettoierez la salle de bain et les sanitaires, effectuerez la poussière et passerez l\'aspirateur.  \n\nNous vous proposons un contrat en vacation, vous devez pouvoir être disponible les weekend. 3 à 4 vacations par semaine.\nLa durée du contrat et le nombre d\'heure varieront en fonction des nécessites du service; c\'est à dire de 20 h à 24h de travail par semaine.\n\nPrise de poste au plus tôt.\n',
            entreprise: undefined,
            from: 'peJob',
            id: '132MDKM',
            intitulé: 'Valet / Femme de chambre',
            niveauRequis: undefined,
            typeDeContrats: ['Contrat apprentissage'],
            ville: 'BALARUC LES BAINS (34)',
            étiquetteList: ['BALARUC LES BAINS (34)', 'Expérience souhaitée', 'CDD', 'Temps partiel'],
          },
        ],
      });
      expect(mockApiPoleEmploiOffreRepository.searchOffreEmploi).toHaveBeenCalledWith({
        codeROMEs: ['C1203', 'C1206', 'C1102'],
        grandDomaineList: [],
        localisation: {
          code: '75056',
          type: TypeLocalisation.COMMUNE,
        },
        natureContrats: ['E2', 'FS'],
        nombreOffreParPage: 50,
        page: 1,
        typeDeContratList: [],
      });
    });
  });

  describe('getOffreAlternance', () => {
    describe('quand l\'offre provient de matcha', () => {
      it('récupère l\'offre d\'alternance selon l\'id', async () => {

        jest
          .spyOn(httpClientService, 'get')
          .mockResolvedValue(createSuccess(anApprentiBoucherFromMatcha()));
        const expected = anApprentiBoucherFromMatcha();
        const offreAlternanceId = '628a65a72ff4860027ae1531';

        const result = await apiAlternanceRepository.getOffreAlternance(offreAlternanceId) as unknown as Success<AlternanceMatchasResponse>;
        expect(result.result).toEqual(expected);
        expect(httpClientService.get).toHaveBeenCalledWith(
          `jobs/matcha/${offreAlternanceId}`,
          mapOffreAlternanceMatcha,
        );
      });
    });
  });
});
