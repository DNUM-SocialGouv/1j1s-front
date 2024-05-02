import { aRechercheCommuneResponse } from '~/server/localisations/infra/repositories/apiGeo.fixture';
import { mapLocalisationList } from '~/server/localisations/infra/repositories/apiGeo.mapper';

describe('mapper pour les api de geo localisation', () => {
	describe('mapLocalisationList', () => {
		it('retourne la liste des localisations trouvées par l api decoupage administratif', () => {
			const result = mapLocalisationList(aRechercheCommuneResponse().data);

			expect(result).toEqual([{ code: '36200', nom: 'Chavin' }, { code: '92370', nom: 'Chaville' }]);
		});
	});

});
