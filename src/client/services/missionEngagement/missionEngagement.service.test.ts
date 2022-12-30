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
				const missionEngagementQuery = 'domain=sante&page=2';

				jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatRechercheMission()));

				const result = await missionEngagementService.rechercherMission(missionEngagementQuery, catégorie);

				expect(result).toEqual({ instance: 'success', result: aRésultatRechercheMission() });
				expect(httpClientService.get).toHaveBeenCalledWith('services-civique?domain=sante&page=2');

			});
		});

		describe('quand la catégorie est bénévolat', () => {
			it('appelle benevolats avec le filtre', async () => {
				const httpClientService = anHttpClientService();
				const missionEngagementService = new MissionEngagementService(httpClientService);
				const catégorie = 'bénévolat';
				const missionEngagementQuery = 'domain=sante&page=2';

				jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatRechercheMission()));

				const result = await missionEngagementService.rechercherMission(missionEngagementQuery, catégorie);

				expect(result).toEqual({ instance: 'success', result: aRésultatRechercheMission() });
				expect(httpClientService.get).toHaveBeenCalledWith('benevolats?domain=sante&page=2');

			});
		});
	});
});
