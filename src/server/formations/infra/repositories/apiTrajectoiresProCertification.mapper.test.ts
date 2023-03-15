import {
	ApiTrajectoiresProCertificationResponse,
} from '~/server/formations/infra/repositories/apiTrajectoiresProCertification';
import { mapCertification } from '~/server/formations/infra/repositories/apiTrajectoiresProCertification.mapper';

describe('mapCertification', () => {
	it('convertit une response en certification', () => {
		const input: ApiTrajectoiresProCertificationResponse = {
			millesime: '2020_2021',
			region: { nom: 'Auvergne-Rhône-Alpes' },
			taux_autres_6_mois: '0.1',
			taux_en_emploi_6_mois: '0.2',
			taux_en_formation: '0.3',
		};

		const output = mapCertification(input);

		expect(output).toEqual({
			millesime: '2020-2021',
			region: 'Auvergne-Rhône-Alpes',
			tauxAutres6Mois: '0.1',
			tauxEnEmploi6Mois: '0.2',
			tauxEnFormation: '0.3',
		});
	});
});
