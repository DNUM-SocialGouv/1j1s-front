import {
	ApiTrajectoiresProStatistiqueResponse,
} from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique';
import { mapStatistiques } from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique.mapper';

describe('mapStatistique', () => {
	it('convertit une response en statistique', () => {
		const input: ApiTrajectoiresProStatistiqueResponse = {
			millesime: '2020_2021',
			region: { nom: 'Auvergne-Rhône-Alpes' },
			taux_autres_6_mois: '10',
			taux_en_emploi_6_mois: '20',
			taux_en_formation: '30',
		};

		const output = mapStatistiques(input);

		expect(output).toEqual({
			millesime: '2020-2021',
			region: 'Auvergne-Rhône-Alpes',
			tauxAutres6Mois: '10',
			tauxEnEmploi6Mois: '20',
			tauxEnFormation: '30',
		});
	});
});
