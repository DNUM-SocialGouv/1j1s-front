import { aCommuneQuery } from '~/client/hooks/useCommuneQuery';
import { MissionEngagementQueryParams } from '~/client/hooks/useMissionEngagementQuery';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { BffMissionEngagementService } from '~/client/services/missionEngagement/bff.missionEngagement.service';
import { aRésultatRechercheMission } from '~/server/engagement/domain/missionEngagement.fixture';
import { createSuccess } from '~/server/errors/either';

describe('MissionEngagementService', () => {
	describe('rechercherMission', () => {
		describe('quand la catégorie est services-civique', () => {
			it('appelle services-civique avec le filtre', async () => {
				const httpClientService = anHttpClientService();
				const missionEngagementService = new BffMissionEngagementService(httpClientService);
				const catégorie = 'service-civique';
				const missionEngagementQuery: MissionEngagementQueryParams = {
					distanceCommune: '10',
					domain: 'sante',
					ouvertsAuxMineurs: true,
					page: '2',
					...aCommuneQuery({}),
				};

				vi.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatRechercheMission()));

				const result = await missionEngagementService.rechercherMission(missionEngagementQuery, catégorie);

				expect(result).toEqual(createSuccess(aRésultatRechercheMission()));
				expect(httpClientService.get).toHaveBeenCalledWith('services-civique?distanceCommune=10&domain=sante&ouvertsAuxMineurs=true&page=2&codeCommune=75056&codePostal=75006&latitudeCommune=48.859&longitudeCommune=2.347&ville=Paris');
			});
		});

		describe('quand la catégorie est bénévolat', () => {
			it('appelle benevolats avec le filtre', async () => {
				const httpClientService = anHttpClientService();
				const missionEngagementService = new BffMissionEngagementService(httpClientService);
				const catégorie = 'bénévolat';
				const missionEngagementQuery: MissionEngagementQueryParams = {
					distanceCommune: '10',
					domain: 'sante',
					ouvertsAuxMineurs: true,
					page: '2',
					...aCommuneQuery(),
				};

				vi.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aRésultatRechercheMission()));

				const result = await missionEngagementService.rechercherMission(missionEngagementQuery, catégorie);

				expect(result).toEqual(createSuccess(aRésultatRechercheMission()));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('benevolats?'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('distanceCommune=10'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('domain=sante'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('ouvertsAuxMineurs=true'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('page=2'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('codeCommune=75056'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('codePostal=75006'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('latitudeCommune=48.859'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('longitudeCommune=2.347'));
				expect(httpClientService.get).toHaveBeenCalledWith(expect.stringContaining('ville=Paris'));
			});
		});
		it('filtre les clés undefined', async () => {
			const httpClientService = anHttpClientService();
			const missionEngagementService = new BffMissionEngagementService(httpClientService);
			const catégorie = 'bénévolat';
			const missionEngagementQuery: MissionEngagementQueryParams = {
				distanceCommune: '10',
				domain: undefined,
				ouvertsAuxMineurs: true,
				page: '2',
				...aCommuneQuery(),
			};

			await missionEngagementService.rechercherMission(missionEngagementQuery, catégorie);

			expect(httpClientService.get).toHaveBeenCalledWith(expect.not.stringContaining('domain'));
		});
	});
});
