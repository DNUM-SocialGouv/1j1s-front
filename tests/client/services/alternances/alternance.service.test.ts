/**
 * @jest-environment jsdom
 */
import { aHttpClientService } from '@tests/fixtures/client/services/httpClientService.fixture';
import { aRésultatsRechercheAlternance } from '@tests/fixtures/domain/alternance.fixture';

import { AlternanceService } from '~/client/services/alternances/alternance.service';
import { createSuccess } from '~/server/errors/either';

describe('AlternanceService', () => {
  describe('rechercherAlternance', () => {
    it('appelle alternance avec les filtres', async () => {
      const httpClientService = aHttpClientService();
      const offreAlternanceService = new AlternanceService(httpClientService);
      const query = 'codeRomes=D1103,D1101,H2101&insee=43135&radius=30';

      jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatsRechercheAlternance()));

      const result = await offreAlternanceService.rechercherAlternance(query);

      expect(result).toEqual({
        instance: 'success',
        result: {
          nombreRésultats: 1,
          résultats: [
            {
              adresse: '77 RUE DES BOURGUIGNONS 92270 BOIS-COLOMBES',
              description: 'Réalise les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires.\\nPeut effectuer la vente de produits de boucherie.\\nPeut gérer un commerce de détail alimentaire (boucherie, boucherie-charcuterie, ...).',
              entreprise: {
                nom: 'BOUCHERIE STEPHANE VEIT',
              },
              from: 'matcha',
              id: '628a64ed2ff4860027ae1501',
              intitulé: 'Boucherie',
              niveauRequis: 'Cap, autres formations niveau (Infrabac)',
              typeDeContrats: [
                'Apprentissage',
                'Professionnalisation',
              ],
              étiquetteList: [
                'Cap, autres formations niveau (Infrabac)',
                'Apprentissage',
                'Professionnalisation',
              ],
            },
          ],
        },
      });
      expect(httpClientService.get).toHaveBeenCalledWith('alternances?codeRomes=D1103,D1101,H2101&insee=43135&radius=30');
    });
  });
});
