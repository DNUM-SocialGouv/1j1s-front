import {
	anÉtablissementAccompagnementList,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement.fixture';
import {
	aRésultatRechercheÉtablissementPublicResponse,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.fixture';
import {
	mapEtablissementPublicAccompagnement,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.mapper';

describe('Mapper Établissement Accompagnement', () => {
	describe('mapÉtablissementAccompagnement', () => {
		describe('quand le résultat de l‘api est dans le bon ordre', () => {
			it('retourne la liste des établissements publics', () => {
				// given
				const résultatRechercheÉtablissementPublicResponse = aRésultatRechercheÉtablissementPublicResponse();
				// when
				const result = mapEtablissementPublicAccompagnement([résultatRechercheÉtablissementPublicResponse]);
				const expected = anÉtablissementAccompagnementList();
				// then
				expect(result).toEqual(expected);
			});
		});
	});
});
