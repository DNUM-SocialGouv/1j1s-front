import { aMissionEngagementFiltre } from '~/server/engagement/domain/missionEngagement.fixture';
import { buildParamètresRechercheApiEngagement } from '~/server/engagement/infra/repositories/apiEngagement.builder';

const PUBLISHER_ID = 'a-publisher-id';

describe('buildParamètresRechercheApiEngagement', () => {
	describe('quand le filtre comporte une localisation', () => {
		it('retourne une chaine de requête complète pour l’api engagement', () => {
			const filter = aMissionEngagementFiltre();

			const result = buildParamètresRechercheApiEngagement(filter, PUBLISHER_ID);

			expect(result).toEqual('domain=sante&from=0&publisher=a-publisher-id&size=15&openToMinors=yes&distance=10km&lat=2.3522&lon=48.8566');
		});
	});

	describe('quand le filtre ne comporte pas de localisation', () => {
		it('retourne une chaine de requête sans localisation pour l’api engagement', () => {
			const filter = aMissionEngagementFiltre({ localisation: undefined });

			const result = buildParamètresRechercheApiEngagement(filter, PUBLISHER_ID);

			expect(result).toEqual('domain=sante&from=0&publisher=a-publisher-id&size=15&openToMinors=yes');
		});
	});

	describe('quand la page demandée est la première', () => {
		it('requête les 15 premiers résultats depuis l’index 0',() => {
			const filter = aMissionEngagementFiltre();

			const result = buildParamètresRechercheApiEngagement(filter, PUBLISHER_ID);

			expect(result).toContain('from=0');
			expect(result).toContain('size=15');
		});
	});

	describe('quand la page demandée est la deuxième', () => {
		it('requête les 15 résultats suivants depuis l’index 15',() => {
			const filter = aMissionEngagementFiltre({ page: 2 });

			const result = buildParamètresRechercheApiEngagement(filter, PUBLISHER_ID);

			expect(result).toContain('from=15');
			expect(result).toContain('size=15');
		});
	});

	describe('quand la page demandée est la troisième', () => {
		it('requête les 15 résultats suivants depuis l’index 30',() => {
			const filter = aMissionEngagementFiltre({ page: 3 });

			const result = buildParamètresRechercheApiEngagement(filter, PUBLISHER_ID);

			expect(result).toContain('from=30');
			expect(result).toContain('size=15');
		});
	});
});
