/**
 * @jest-environment jsdom
 */
import { InMemoryAppRawDataStorage } from '@tests/client/cache/InMemory.appRawDataStorage';
import { aHttpClientService } from '@tests/fixtures/client/services/httpClientService.fixture';
import { aRésultatsRechercheAlternance } from '@tests/fixtures/domain/alternance.fixture';
import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';

import { AppRawDataStorage } from '~/client/cache/appRawDataStorage';
import { AlternanceService } from '~/client/services/alternances/alternance.service';

describe('AlternanceService', () => {
  let storage: AppRawDataStorage;

  beforeEach(() => {
    storage = new InMemoryAppRawDataStorage();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('rechercherAlternance', () => {
    describe('lorsque le résultat n\'est pas dans le cache', () => {
      it('appelle alternance avec le filtre', async () => {
        const httpClientService = aHttpClientService();
        const offreAlternanceService = new AlternanceService(httpClientService, storage);
        const query = 'codeRomes=D1103,D1101,H2101';

        jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aRésultatsRechercheAlternance()));

        const result = await offreAlternanceService.rechercherAlternance(query);

        expect(result).toEqual({
          nombreRésultats: 4,
          résultats: [
            {
              description: 'Vos missions principales :\n \n- Réaliser les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires. \n- Effectuer la vente de produits de boucherie.',
              entreprise: {
                logo: 'https://entreprise.pole-emploi.fr/static/img/logos/Oukw265FRpXdejCSFnIkDoqQujqGiEt4.png',
                nom: 'AUCHAN SUPERMARCHE',
              },
              id: '134CMXJ',
              intitulé: 'APPRENTI (E) BOUCHER (ERE) (H/F)',
            },
            {
              description: 'Nous sommes à la recherche d\'un(e) apprenti(e) boucher(ère) dans le cadre d\'un CAP.\n\nVous serez formé(e)  entre un centre de formation des apprentis et un employeur.\n\n Passionné(e) par l\'univers de la boucherie, vous souhaitez en faire votre métier, nous sommes prêts à vous former !',
              entreprise: {
                nom: 'SUPERMARCHE MATCH',
              },
              id: '134BYGN',
              intitulé: 'Apprenti/e boucher/ère (H/F)',
            },
            {
              description: 'Réalise les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires.\\nPeut effectuer la vente de produits de boucherie.\\nPeut gérer un commerce de détail alimentaire (boucherie, boucherie-charcuterie, ...).',
              entreprise: {
                nom: 'BOUCHERIE STEPHANE VEIT',
              },
              id: '628a64ed2ff4860027ae1501',
              intitulé: 'Boucherie',
            },
            {
              description: 'Réalise les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires.\\nPeut effectuer la vente de produits de boucherie.\\nPeut gérer un commerce de détail alimentaire (boucherie, boucherie-charcuterie, ...).',
              entreprise: {
                nom: 'BOUCHERIE STEPHANE VEIT',
              },
              id: '628a65a72ff4860027ae1531',
              intitulé: 'Boucherie',
            },
          ],
        });
        expect(httpClientService.get).toHaveBeenCalledWith('alternances?codeRomes=D1103,D1101,H2101');
      });
    });

    describe('lorsque le résultat est présent dans le cache', () => {
      it('retourne la valeur depuis le cache', async () => {
        const httpClientService = aHttpClientService();
        const offreAlternanceService = new AlternanceService(httpClientService, storage);
        const offreEmploiQuery = 'codeRomes=D1103,D1101,H2101';

        jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aRésultatsRechercheAlternance()));

        await offreAlternanceService.rechercherAlternance(offreEmploiQuery);
        const result = await offreAlternanceService.rechercherAlternance(offreEmploiQuery);

        expect(result).toEqual({
          nombreRésultats: 4,
          résultats: [
            {
              description: 'Vos missions principales :\n \n- Réaliser les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires. \n- Effectuer la vente de produits de boucherie.',
              entreprise: {
                logo: 'https://entreprise.pole-emploi.fr/static/img/logos/Oukw265FRpXdejCSFnIkDoqQujqGiEt4.png',
                nom: 'AUCHAN SUPERMARCHE',
              },
              id: '134CMXJ',
              intitulé: 'APPRENTI (E) BOUCHER (ERE) (H/F)',
            },
            {
              description: 'Nous sommes à la recherche d\'un(e) apprenti(e) boucher(ère) dans le cadre d\'un CAP.\n\nVous serez formé(e)  entre un centre de formation des apprentis et un employeur.\n\n Passionné(e) par l\'univers de la boucherie, vous souhaitez en faire votre métier, nous sommes prêts à vous former !',
              entreprise: {
                logo: undefined,
                nom: 'SUPERMARCHE MATCH',
              },
              id: '134BYGN',
              intitulé: 'Apprenti/e boucher/ère (H/F)',
            },
            {
              description: 'Réalise les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires.\\nPeut effectuer la vente de produits de boucherie.\\nPeut gérer un commerce de détail alimentaire (boucherie, boucherie-charcuterie, ...).',
              entreprise: {
                logo: undefined,
                nom: 'BOUCHERIE STEPHANE VEIT',
              },
              id: '628a64ed2ff4860027ae1501',
              intitulé: 'Boucherie',
            },
            {
              description: 'Réalise les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires.\\nPeut effectuer la vente de produits de boucherie.\\nPeut gérer un commerce de détail alimentaire (boucherie, boucherie-charcuterie, ...).',
              entreprise: {
                logo: undefined,
                nom: 'BOUCHERIE STEPHANE VEIT',
              },
              id: '628a65a72ff4860027ae1531',
              intitulé: 'Boucherie',
            },
          ],
        });
        expect(httpClientService.get).toHaveBeenCalledTimes(1);
        expect(httpClientService.get).toHaveBeenCalledWith('alternances?codeRomes=D1103,D1101,H2101');
      });
    });
  });
});
