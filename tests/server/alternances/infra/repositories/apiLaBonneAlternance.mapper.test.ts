import { mapNomVille } from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';

describe('mapNomVille', () => {
  describe('quand la ville est communiquée', () => {
    it('retourne le nom de la ville formatté', () => {
      const ville = '44 - Nantes';
      const villeFormatté = mapNomVille(ville);
      expect(villeFormatté).toEqual('Nantes (44)');
    });
  });

  describe('quand la ville est null', () => {
    it('retourne undefined', () => {
      const ville = null;
      const villeFormatté = mapNomVille(ville);
      expect(villeFormatté).toEqual(undefined);
    });
  });

});
