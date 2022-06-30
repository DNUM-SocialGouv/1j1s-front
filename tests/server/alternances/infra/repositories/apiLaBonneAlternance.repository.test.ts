import {
  anApprentiBoucherFromMatcha,
  anApprentiBoucherFromPoleEmploi,
} from '@tests/fixtures/domain/alternance.fixture';
import {
  aApiPoleEmploiRéférentielRepository,
} from '@tests/fixtures/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository.fixture';
import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';
import {
  aLaBonneAlternanceHttpClient,
  anAlternanceListResponse,
  anApprentiBoucherFromMatchaAxiosResponse,
  anApprentiBoucherFromPoleEmploiAxiosResponse,
  aRechercheMétierResponse,
} from '@tests/fixtures/services/laBonneAlternanceHttpClientService.fixture';

import {
  AlternanceDetailResponse,
  ApiLaBonneAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { Failure, Success } from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import {
  ApiPoleEmploiRéférentielRepository,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiRéférentiel.repository';
import { LaBonneAlternanceHttpClientService } from '~/server/services/http/laBonneAlternanceHttpClient.service';

jest.mock('axios', () => {
  return {
    isAxiosError: jest.fn().mockReturnValue(true),
  };
});

describe('ApiLaBonneAlternanceRepository', () => {
  let apiLaBonneAlternanceRepository: ApiLaBonneAlternanceRepository;
  let laBonneAlternanceHttpClientService: LaBonneAlternanceHttpClientService;
  let apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository;

  beforeEach(() => {
    laBonneAlternanceHttpClientService = aLaBonneAlternanceHttpClient();
    apiPoleEmploiRéférentielRepository = aApiPoleEmploiRéférentielRepository();
    apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(
      laBonneAlternanceHttpClientService,
      apiPoleEmploiRéférentielRepository,
    );
  });

  describe('getMétierRecherchéList', () => {
    it('retourne la liste des métiers recherchés par l\'api la bonne alternance', async () => {


      jest.spyOn(laBonneAlternanceHttpClientService, 'get').mockResolvedValue(aRechercheMétierResponse());

      const result = await apiLaBonneAlternanceRepository.getMétierRecherchéList('bou');

      expect(laBonneAlternanceHttpClientService.get).toHaveBeenCalledWith('metiers?title=bou');
      expect([
        {
          codeROMEList: ['D1103', 'D1101', 'H2101'],
          intitulé: 'Boucherie, charcuterie, traiteur',
        },
        {
          codeROMEList: ['D1102', 'D1104'],
          intitulé: 'Boulangerie, pâtisserie, chocolaterie',
        },
      ]).toEqual(result);
    });
  });

  describe('getAlternanceList', () => {
    it('retourne la liste des alternances recherchées par l\'api la bonne alternance filtré par domaine et lieu', async () => {
      jest.spyOn(laBonneAlternanceHttpClientService, 'get').mockResolvedValue(anAlternanceListResponse());
      jest.spyOn(apiPoleEmploiRéférentielRepository, 'findCodeInseeInRéférentielCommune').mockResolvedValue('75101');

      const result = await apiLaBonneAlternanceRepository.getAlternanceList({ codeLocalisation: '75001', codeRomeList: ['D1103','D1101','H2101'] });

      expect(laBonneAlternanceHttpClientService.get).toHaveBeenCalledWith('jobs?insee=75101&romes=D1103%2CD1101%2CH2101&caller=1jeune1solution');
      expect(result.nombreRésultats).toEqual(4);
      expect(result.résultats,
      ).toEqual([
        {
          adresse: '15 - AURILLAC 15000',
          description: 'Vos missions principales :\n \n- Réaliser les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires. \n- Effectuer la vente de produits de boucherie.',
          entreprise: {
            logo: 'https://entreprise.pole-emploi.fr/static/img/logos/Oukw265FRpXdejCSFnIkDoqQujqGiEt4.png',
            nom: 'AUCHAN SUPERMARCHE',
          },
          from: 'peJob',
          id: '134CMXJ',
          intitulé: 'APPRENTI (E) BOUCHER (ERE) (H/F)',
          niveauRequis: 'Alternance',
          typeDeContrats: ['CDD'],
          ville: 'AURILLAC (15)',
          étiquetteList: ['AURILLAC (15)', 'Alternance', 'CDD'],
        },
        {
          adresse: '57 - CHATEAU SALINS 57170',
          description: 'Nous sommes à la recherche d\'un(e) apprenti(e) boucher(ère) dans le cadre d\'un CAP.\n\nVous serez formé(e)  entre un centre de formation des apprentis et un employeur.\n\n Passionné(e) par l\'univers de la boucherie, vous souhaitez en faire votre métier, nous sommes prêts à vous former !',
          entreprise: {
            logo: undefined,
            nom: 'SUPERMARCHE MATCH',
          },
          from: 'peJob',
          id: '134BYGN',
          intitulé: 'Apprenti/e boucher/ère (H/F)',
          niveauRequis: 'Alternance',
          typeDeContrats: ['CDD'],
          ville: 'CHATEAU SALINS (57)',
          étiquetteList: ['CHATEAU SALINS (57)', 'Alternance', 'CDD'],
        },
        {
          adresse: '77 RUE DES BOURGUIGNONS 92270 BOIS-COLOMBES',
          description: 'Réalise les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires.\\nPeut effectuer la vente de produits de boucherie.\\nPeut gérer un commerce de détail alimentaire (boucherie, boucherie-charcuterie, ...).',
          entreprise: {
            logo: undefined,
            nom: 'BOUCHERIE STEPHANE VEIT',
          },
          from: 'matcha',
          id: '628a64ed2ff4860027ae1501',
          intitulé: 'Boucherie',
          niveauRequis: 'Cap, autres formations niveau (Infrabac)',
          typeDeContrats: ['Apprentissage', 'Professionnalisation'],
          ville: undefined,
          étiquetteList: ['Cap, autres formations niveau (Infrabac)', 'Apprentissage', 'Professionnalisation'],
        },
        {
          adresse: '77 RUE DES BOURGUIGNONS 92270 BOIS-COLOMBES',
          description: 'Réalise les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires.\\nPeut effectuer la vente de produits de boucherie.\\nPeut gérer un commerce de détail alimentaire (boucherie, boucherie-charcuterie, ...).',
          entreprise: {
            logo: undefined,
            nom: 'BOUCHERIE STEPHANE VEIT',
          },
          from: 'matcha',
          id: '628a65a72ff4860027ae1531',
          intitulé: 'Boucherie',
          niveauRequis: 'Cap, autres formations niveau (Infrabac)',
          typeDeContrats: ['Apprentissage', 'Professionnalisation'],
          ville: undefined,
          étiquetteList: ['Cap, autres formations niveau (Infrabac)', 'Apprentissage', 'Professionnalisation'],
        },
      ]);
    });
  });

  describe('getOffreAlternance', () => {
    describe('quand l\'offre provient de pole emploi', () => {
      it('récupère l\'offre d\'alternance selon l\'id', async () => {

        jest
          .spyOn(laBonneAlternanceHttpClientService, 'get')
          .mockResolvedValue(anApprentiBoucherFromPoleEmploiAxiosResponse());
        const expected = anApprentiBoucherFromPoleEmploi();
        const offreAlternanceId = '134BYGN';
        const from = 'peJob';

        const result = await apiLaBonneAlternanceRepository.getOffreAlternance(offreAlternanceId, from) as unknown as Success<AlternanceDetailResponse>;
        expect(result.result).toEqual(expected);
        expect(laBonneAlternanceHttpClientService.get).toHaveBeenCalledWith(
          `jobs/job/${offreAlternanceId}`,
        );
      });
    });

    describe('quand l\'offre provient de matcha', () => {
      it('récupère l\'offre d\'alternance selon l\'id', async () => {

        jest
          .spyOn(laBonneAlternanceHttpClientService, 'get')
          .mockResolvedValue(anApprentiBoucherFromMatchaAxiosResponse());
        const expected = anApprentiBoucherFromMatcha();
        const offreAlternanceId = '628a65a72ff4860027ae1531';
        const from = 'matcha';

        const result = await apiLaBonneAlternanceRepository.getOffreAlternance(offreAlternanceId, from) as unknown as Success<AlternanceDetailResponse>;
        expect(result.result).toEqual(expected);
        expect(laBonneAlternanceHttpClientService.get).toHaveBeenCalledWith(
          `jobs/matcha/${offreAlternanceId}`,
        );
      });
    });

    describe('quand l\'api répond avec une 400', () => {
      it('on renvoie une failure avec une error SERVICE_INDISPONIBLE', async () => {
        const offreAlternanceId = 'fake-idea';
        const from = 'matcha';

        jest
          .spyOn(laBonneAlternanceHttpClientService, 'get')
          .mockResolvedValue(Promise.reject({ response: { status: 500 } }));

        const result = await apiLaBonneAlternanceRepository.getOffreAlternance(offreAlternanceId, from) as Failure;

        expect(result.errorType).toEqual(ErrorType.SERVICE_INDISPONIBLE);
      });
    });

    describe('quand l\'api répond avec une 500', () => {
      it('on renvoie une failure avec une error DEMANDE_INCORRECTE', async () => {
        const offreAlternanceId = 'fake-idea';
        const from = 'matcha';

        jest
          .spyOn(laBonneAlternanceHttpClientService, 'get')
          .mockResolvedValue(Promise.reject({ response: { status: 400 } }));

        const result = await apiLaBonneAlternanceRepository.getOffreAlternance(offreAlternanceId, from) as Failure;

        expect(result.errorType).toEqual(ErrorType.DEMANDE_INCORRECTE);
      });
    });

    describe('quand l\'api répond avec une erreur non traité', () => {
      it('on renvoie une failure avec une error ERREUR_INATTENDUE', async () => {
        const offreAlternanceId = 'fake-idea';
        const from = 'matcha';

        jest
          .spyOn(laBonneAlternanceHttpClientService, 'get')
          .mockResolvedValue(Promise.reject({ response: { status: 666 } }));

        const result = await apiLaBonneAlternanceRepository.getOffreAlternance(offreAlternanceId, from) as Failure;

        expect(result.errorType).toEqual(ErrorType.ERREUR_INATTENDUE);
      });
    });

    describe('quand l\'api répond une 200 avec une réponse en erreur', () => {
      it('on renvoie une failure avec une error ERREUR_INATTENDUE', async () => {
        const offreAlternanceId = 'fake-idea';
        const from = 'matcha';

        jest
          .spyOn(laBonneAlternanceHttpClientService, 'get')
          .mockResolvedValue(anAxiosResponse({
            message: 'Offre non trouvée',
            result: 'not_found',
          }));

        const result = await apiLaBonneAlternanceRepository.getOffreAlternance(offreAlternanceId, from) as Failure;

        expect(result.errorType).toEqual(ErrorType.ERREUR_INATTENDUE);
      });
    });
  });

  describe('buildParamètresRechercheAlternance', () => {
    it('quand on cherche des codeRomes', async () => {
      const result = await apiLaBonneAlternanceRepository.buildParamètresRecherche({ codeRomeList: ['D1103', 'D1101', 'H2101'] });

      expect(result).toEqual('romes=D1103%2CD1101%2CH2101&caller=1jeune1solution');
    });

    it('quand on cherche avec un lieu', async () => {
      jest.spyOn(apiPoleEmploiRéférentielRepository, 'findCodeInseeInRéférentielCommune').mockResolvedValue('75101');
      const result = await apiLaBonneAlternanceRepository.buildParamètresRecherche({
        codeLocalisation: '75035',
        codeRomeList: ['D1103', 'D1101', 'H2101'],
      });

      expect(result).toEqual('insee=75101&romes=D1103%2CD1101%2CH2101&caller=1jeune1solution');
    });

    it('quand on cherche avec un lieu et un rayon', async () => {
      const result = await apiLaBonneAlternanceRepository.buildParamètresRecherche({
        codeLocalisation: '75035',
        codeRomeList: ['D1103', 'D1101', 'H2101'],
        radius:'30',
      });

      expect(result).toEqual('radius=30&romes=D1103%2CD1101%2CH2101&caller=1jeune1solution');
    });

    it('quand on cherche sans lieu et un rayon undefined, on retourne juste le codeRome', async () => {
      const result = await apiLaBonneAlternanceRepository.buildParamètresRecherche({
        codeLocalisation: undefined,
        codeRomeList: ['D1103', 'D1101', 'H2101'],
        radius: undefined,
      });

      expect(result).toEqual('romes=D1103%2CD1101%2CH2101&caller=1jeune1solution');
    });
  });
});
