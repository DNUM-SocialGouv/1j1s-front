import { aCommuneQuery } from '~/client/hooks/useCommuneQuery';
import { MissionEngagementQueryParams } from '~/client/hooks/useMissionEngagementQuery';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { MissionEngagementService } from '~/client/services/missionEngagement/missionEngagement.service';
import { aRésultatRechercheMission } from '~/server/engagement/domain/missionEngagement.fixture';
import { createSuccess } from '~/server/errors/either';

describe('MissionEngagementService', () => {
	describe('rechercherMission', () => {
		describe('quand la catégorie est services-civique', () => {
			it('appelle services-civique avec le filtre', async () => {
				const httpClientService = anHttpClientService();
				const missionEngagementService = new MissionEngagementService(httpClientService);
				const catégorie = 'service-civique';
				const missionEngagementQuery: MissionEngagementQueryParams = {
					distanceCommune: '10',
					domain: 'sante',
					ouvertsAuxMineurs: true,
					page: '2',
					...aCommuneQuery() };

				jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatRechercheMission()));

				const result = await missionEngagementService.rechercherMission(missionEngagementQuery, catégorie);

				expect(result).toEqual({ instance: 'success', result: aRésultatRechercheMission() });
				expect(httpClientService.get).toHaveBeenCalledWith('services-civique?distanceCommune=10&domain=sante&ouvertsAuxMineurs=true&page=2&codeCommune=75056&codePostal=75006&latitudeCommune=48.859&libelleCommune=Paris%20(75006)&longitudeCommune=2.347&ville=Paris');

			});
		});

		describe('quand la catégorie est bénévolat', () => {
			it('appelle benevolats avec le filtre', async () => {
				const httpClientService = anHttpClientService();
				const missionEngagementService = new MissionEngagementService(httpClientService);
				const catégorie = 'bénévolat';
				const missionEngagementQuery: MissionEngagementQueryParams = {
					distanceCommune: '10',
					domain: 'sante',
					ouvertsAuxMineurs: true,
					page: '2',
					...aCommuneQuery() };

				jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatRechercheMission()));

				const result = await missionEngagementService.rechercherMission(missionEngagementQuery, catégorie);

				expect(result).toEqual({ instance: 'success', result: aRésultatRechercheMission() });
				expect(httpClientService.get).toHaveBeenCalledWith('benevolats?distanceCommune=10&domain=sante&ouvertsAuxMineurs=true&page=2&codeCommune=75056&codePostal=75006&latitudeCommune=48.859&libelleCommune=Paris%20(75006)&longitudeCommune=2.347&ville=Paris');
			});
		});
		it('filtre les clés undefined', async () => {
			const httpClientService = anHttpClientService();
			const missionEngagementService = new MissionEngagementService(httpClientService);
			const catégorie = 'bénévolat';
			const missionEngagementQuery: MissionEngagementQueryParams = {
				distanceCommune: '10',
				domain: undefined,
				ouvertsAuxMineurs: true,
				page: '2',
				...aCommuneQuery() };

			await missionEngagementService.rechercherMission(missionEngagementQuery, catégorie);

			expect(httpClientService.get).toHaveBeenCalledWith(expect.not.stringContaining('domain'));
		});
	});
});
