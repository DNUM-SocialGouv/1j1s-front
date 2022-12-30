import {
  anOrderedÉtablissementAccompagnementList,
  anUnorderedÉtablissementAccompagnementList,
} from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement.fixture';
import {
  aRésultatRechercheÉtablissementPublicResponse,
  aRésultatRechercheÉtablissementPublicResponseInIncorrectOrder,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.fixture';
import {
  mapÉtablissementAccompagnement,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.mapper';

describe('Mapper Établissement Accompagnement', () => {
  describe('mapÉtablissementAccompagnement', () => {
    describe('quand le résultat de l‘api est dans le bon ordre', () => {
      it('retourne la liste des établissements publics', () => {
        // given
        const résultatRechercheÉtablissementPublicResponse = aRésultatRechercheÉtablissementPublicResponse();
        // when
        const result = mapÉtablissementAccompagnement(résultatRechercheÉtablissementPublicResponse);
        const expected = anOrderedÉtablissementAccompagnementList();
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
        const expected = anUnorderedÉtablissementAccompagnementList();
        // then
        expect(result).toEqual(expected);
      });
    });
  });
});
