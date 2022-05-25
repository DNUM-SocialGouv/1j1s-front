import {
  aAlternanceListResponse,
  aLaBonneAlternanceHttpClient,
  aRechercheMétierResponse,
} from '@tests/fixtures/services/laBonneAlternanceHttpClientService.fixture';

import { ApiLaBonneAlternanceRepository } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import { LaBonneAlternanceHttpClient } from '~/server/services/http/laBonneAlternanceHttpClient.service';

describe('ApiLaBonneAlternanceRepository', () => {
  let laBonneAlternanceHttpClient: LaBonneAlternanceHttpClient;

  beforeEach(() => {
    laBonneAlternanceHttpClient = aLaBonneAlternanceHttpClient();
  });

  describe('getMétierRecherchéList', () => {
    it('retourne la liste des métiers recherchés par l\'api la bonne alternance', async () => {
      const apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(laBonneAlternanceHttpClient);

      jest.spyOn(laBonneAlternanceHttpClient, 'get').mockResolvedValue(aRechercheMétierResponse());

      const result = await apiLaBonneAlternanceRepository.getMétierRecherchéList('bou');

      expect(laBonneAlternanceHttpClient.get).toHaveBeenCalledWith('metiers?title=bou');
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
    it('retourne la liste des alternances recherchées par l\'api la bonne alternance', async () => {
      const apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(laBonneAlternanceHttpClient);

      jest.spyOn(laBonneAlternanceHttpClient, 'get').mockResolvedValue(aAlternanceListResponse());

      const result = await apiLaBonneAlternanceRepository.getAlternanceList({ codeRomeList: ['D1103','D1101','H2101'] });

      expect(laBonneAlternanceHttpClient.get).toHaveBeenCalledWith('jobs?romes=D1103,D1101,H2101&caller=1j1s@octo.com');
      expect(result.nombreRésultats).toEqual(4);
      expect(result.résultats,
      ).toEqual([
        {
          description: 'Vos missions principales :\n \n- Réaliser les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires. \n- Effectuer la vente de produits de boucherie.',
          entreprise: {
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
      ]);
    });
  });
});
