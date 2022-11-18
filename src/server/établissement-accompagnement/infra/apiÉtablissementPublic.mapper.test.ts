import {
  anÉtablissementAccompagnementList,
} from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement.fixture';
import {
  aRésultatRechercheÉtablissementPublicResponse,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.fixture';
import {
  mapÉtablissementAccompagnement,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.mapper';

describe('Mapper Établissement Accompagnement', () => {
  describe('mapÉtablissementAccompagnement', () => {
    it('retourne la liste des établissements publics', () => {
      // given
      const résultatRechercheÉtablissementPublicResponse = aRésultatRechercheÉtablissementPublicResponse();
      // when
      const result = mapÉtablissementAccompagnement(résultatRechercheÉtablissementPublicResponse);
      const expected = anÉtablissementAccompagnementList();
      // then
      expect(result).toEqual(expected);
    });
  });
});
