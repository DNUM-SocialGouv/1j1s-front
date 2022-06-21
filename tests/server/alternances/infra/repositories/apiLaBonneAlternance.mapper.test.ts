import {
  mapNomVille,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import { mapDateDébutContrat } from '~/server/utils/mapDateDébutContrat.mapper.utils';

describe('mapNomVille', () => {
  describe('quand la ville est communiquée', () => {
    it('retourne le nom de la ville formatté', () => {
      const ville = '44 - Nantes';
      const villeFormattée = mapNomVille(ville);
      expect(villeFormattée).toEqual('Nantes (44)');
    });
  });

  describe('quand la ville n\'est pas communiquée', () => {
    it('retourne undefined', () => {
      const ville = undefined;
      const villeFormattée = mapNomVille(ville);
      expect(villeFormattée).toEqual(undefined);
    });
  });
});

describe('mapDateDébutContrat', () => {

  describe('quand la date de début de contrat est communiquée', () => {
    it('retourne la date formatté', () => {
      const dateDébutContrat = '2022-02-09T00:00:00.000Z';
      const dateFormattée = mapDateDébutContrat(dateDébutContrat);
      expect(dateFormattée).toEqual('09/02/2022');
    });
  });

  describe('quand la date de début de n\'est pas communiquée', () => {
    it('retourne undefined', () => {
      const dateDébutContrat = undefined;
      const dateFormattée = mapDateDébutContrat(dateDébutContrat);
      expect(dateFormattée).toEqual(undefined);
    });
  });
});
