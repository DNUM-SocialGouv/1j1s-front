import { aMissionEngagementFiltre } from '~/server/engagement/domain/missionEngagement.fixture';
import { buildParamètresRechercheApiEngagement } from '~/server/engagement/infra/repositories/apiEngagement.builder';

describe('buildParamètresRechercheApiEngagement', () => {
	it('retourner les paramétres de recherche pour l api engagement', () => {
		const filter = aMissionEngagementFiltre();

		const result = buildParamètresRechercheApiEngagement(filter);

		expect(result).toEqual('distance=10km&domain=sante&from=0&lat=2.3522&lon=48.8566&openToMinors=yes&publisher=a-publisher-id&size=30');
	});
	it('retourner pas les paramétres de vide', () => {
		const filter = aMissionEngagementFiltre({ distance: undefined, lat: undefined, lon: undefined });

		const result = buildParamètresRechercheApiEngagement(filter);

		expect(result).toEqual('domain=sante&from=0&openToMinors=yes&publisher=a-publisher-id&size=30');
	});

	it('quand la page est 1 retourne from=0',() => {
		const filter = aMissionEngagementFiltre();

		const result = buildParamètresRechercheApiEngagement(filter);

		expect(result).toContain('from=0');
	});

	it('quand la page est 2 retourne from=15',() => {
		const filter = aMissionEngagementFiltre({ from: 2 });

		const result = buildParamètresRechercheApiEngagement(filter);

		expect(result).toContain('from=15');
	});

	it('quand la page est 3 retourne from=30',() => {
		const filter = aMissionEngagementFiltre({ from: 3 });

		const result = buildParamètresRechercheApiEngagement(filter);

		expect(result).toContain('from=30');
	});
});
