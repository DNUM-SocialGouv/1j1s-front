import {
  anOffreEmploiResponseCompétenceList, anOffreEmploiResponseCompétenceListAvecCompétenceNonDéfinie,
} from '@tests/fixtures/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.response.fixture';

import { mapCompétence } from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.mapper';

describe('mapCompétence', () => {
  describe('quand la réponse des compétences est undefined', () => {
    it('retourne undefined', () => {
      //given
      const compétenceResponse = undefined;
      //when
      const mappedOffreEmploiCompétenceList = mapCompétence(compétenceResponse);
      const résultatAttendu = undefined;
      //then
      expect(mappedOffreEmploiCompétenceList).toEqual(résultatAttendu);
    });
  });

  describe('quand on récupère une liste de compétences', () => {
    it('retourne les compétences', () => {
      //given
      const compétenceResponse = anOffreEmploiResponseCompétenceList();
      //when
      const mappedOffreEmploiCompétenceList = mapCompétence(compétenceResponse);

      const résultatAttendu: string[] = [
        'Réaliser la prescription médicale',
        'Déterminer les besoins thérapeutiques'];
      //then
      expect(mappedOffreEmploiCompétenceList).toEqual(résultatAttendu);
    });

    it('retourne seulement les libellés qui ne sont pas undefined', () => {
      const compétenceResponse = anOffreEmploiResponseCompétenceListAvecCompétenceNonDéfinie();

      const mappedOffreEmploiCompétenceList = mapCompétence(compétenceResponse);
      const résultatAttendu: string[] = [
        'Réaliser la prescription médicale',
      ];
      expect(mappedOffreEmploiCompétenceList).toEqual(résultatAttendu);
    });
  });
});













