/**
 * @jest-environment jsdom
 */
import { aHttpClientService } from '@tests/fixtures/client/services/httpClientService.fixture';
import { aRésultatsRechercheAlternance } from '@tests/fixtures/domain/alternance.fixture';
import { anAxiosResponse } from '@tests/fixtures/services/httpClientService.fixture';

import { AlternanceService } from '~/client/services/alternances/alternance.service';

describe('AlternanceService', () => {
  describe('rechercherAlternance', () => {
    it('appelle alternance avec le filtre', async () => {
      const httpClientService = aHttpClientService();
      const offreAlternanceService = new AlternanceService(httpClientService);
      const query = 'codeRomes=D1103,D1101,H2101';

      jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse(aRésultatsRechercheAlternance()));

      const result = await offreAlternanceService.rechercherAlternance(query);

      expect(result).toEqual({
        nombreRésultats: 4,
        résultats: [
          {
            adresse: '15 - AURILLAC 15000',
            description: 'Vos missions principales :\n \n- Réaliser les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires. \n- Effectuer la vente de produits de boucherie.',
            entreprise: {
              logo: 'https://entreprise.pole-emploi.fr/static/img/logos/Oukw265FRpXdejCSFnIkDoqQujqGiEt4.png',
              nom: 'AUCHAN SUPERMARCHE',
            },
            id: '134CMXJ',
            ideaType: 'peJob',
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
              nom: 'SUPERMARCHE MATCH',
            },
            id: '134BYGN',
            ideaType: 'peJob',
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
              nom: 'BOUCHERIE STEPHANE VEIT',
            },
            id: '628a64ed2ff4860027ae1501',
            ideaType: 'matcha',
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
              nom: 'BOUCHERIE STEPHANE VEIT',
            },
            id: '628a65a72ff4860027ae1531',
            ideaType: 'matcha',
            intitulé: 'Boucherie',
            niveauRequis: 'Cap, autres formations niveau (Infrabac)',
            typeDeContrats: ['Apprentissage', 'Professionnalisation'],
            ville: undefined,
            étiquetteList: ['Cap, autres formations niveau (Infrabac)', 'Apprentissage', 'Professionnalisation'],
          },
        ],
      });
      expect(httpClientService.get).toHaveBeenCalledWith('alternances?codeRomes=D1103,D1101,H2101');
    });
  });
});
