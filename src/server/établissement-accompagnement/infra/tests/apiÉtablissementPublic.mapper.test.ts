import {
  anÉtablissementAccompagnementList,
  anotherÉtablissementAccompagnementList,
} from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement.fixture';
import {
  mapÉtablissementAccompagnement,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.mapper';
import {
  aRésultatRechercheÉtablissementPublicResponse,
  aRésultatRechercheÉtablissementPublicResponseInIncorrectOrder,
} from '~/server/établissement-accompagnement/infra/tests/apiÉtablissementPublic.fixture';

describe('Mapper Établissement Accompagnement', () => {
  describe('mapÉtablissementAccompagnement', () => {
    describe('quand le résultat de l‘api est dans le bon ordre', () => {
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
    describe('quand le résultat de l‘api est dans le mauvais ordre', () => {
      it('retourne la liste des établissements publics', () => {
        // given
        const résultatRechercheÉtablissementPublicResponse = aRésultatRechercheÉtablissementPublicResponseInIncorrectOrder();
        // when
        const result = mapÉtablissementAccompagnement(résultatRechercheÉtablissementPublicResponse);
        const expected = anotherÉtablissementAccompagnementList();
        // then
        expect(result).toEqual(expected);
      });
    });
  });
});
