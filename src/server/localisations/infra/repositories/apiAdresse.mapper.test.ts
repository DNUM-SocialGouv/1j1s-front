import { aRechercheAdresseResponse } from '~/server/localisations/infra/repositories/apiAdresse.fixture';
import { mapRésultatsRechercheCommune } from '~/server/localisations/infra/repositories/apiAdresse.mapper';

describe('mapRésultatsRechercheCommune', () => {
	it('retourne la liste des adresses trouvées par l api adresse', () => {
		const result = mapRésultatsRechercheCommune(aRechercheAdresseResponse().data);

		expect(result).toEqual({
			résultats: [
				{
					code: '93005',
					codePostal: '93600',
					coordonnées: {
						latitude: 48.926541,
						longitude: 2.493832,
					},
					ville: 'Aulnay-sous-Bois',
				},
				{
					code: '28201',
					codePostal: '28300',
					coordonnées: {
						latitude: 48.510887,
						longitude: 1.553914,
					},
					ville: 'Jouy',
				},
			],
		});
	});
});
