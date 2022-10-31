import { anOffreÉchantillonAvecLocalisationEtMotCléFiltre } from '@tests/fixtures/domain/offre.fixture';
import {
  aApiPoleEmploiRéférentielRepository,
} from '@tests/fixtures/server/offresEmploi/apiPoleEmploiRéférentiel.repository.fixture';

import {
  PoleEmploiParamètreBuilderService,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiParamètreBuilder.service';

describe('poleEmploiParamètreBuilder.service', () => {
  const apiPoleEmploiRéférentielRepositoryMock = aApiPoleEmploiRéférentielRepository();

  describe('buildCommonParamètresRecherche', () => {
    it('retourne les paramètres communs au recherche de l’api pole emploi', async () => {
      jest
        .spyOn(apiPoleEmploiRéférentielRepositoryMock, 'findCodeInseeInRéférentielCommune')
        .mockResolvedValue('75101');

      const result = await new PoleEmploiParamètreBuilderService(apiPoleEmploiRéférentielRepositoryMock).buildCommonParamètresRecherche(anOffreÉchantillonAvecLocalisationEtMotCléFiltre());

      expect(result).toEqual('commune=75101&motsCles=boulanger&range=0-14');
    });

    it('quand la page dépasse le range max renvoie undefined', async () => {
      const result = await new PoleEmploiParamètreBuilderService(apiPoleEmploiRéférentielRepositoryMock).buildCommonParamètresRecherche(anOffreÉchantillonAvecLocalisationEtMotCléFiltre({ page: 1001 }));

      expect(result).toEqual(undefined);
    });
  });
});
