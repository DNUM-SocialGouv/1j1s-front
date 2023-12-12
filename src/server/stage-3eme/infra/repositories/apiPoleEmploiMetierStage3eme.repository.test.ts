import { Success } from '~/server/errors/either';
import { NullCacheService } from '~/server/services/cache/nullCache.service';
import { anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import {
	anAuthenticatedHttpClientService, anAxiosResponse,
} from '~/server/services/http/publicHttpClient.service.fixture';
import { MetierStage3eme } from '~/server/stage-3eme/domain/metierStage3eme';
import {
	ApiPoleEmploiMetierStage3emeRepository,
} from '~/server/stage-3eme/infra/repositories/apiPoleEmploiMetierStage3eme.repository';

describe('ApiPoleEmploiMetierStage3emeRepository', () => {
	describe('search', () => {
		it('appelle l’api Pole Emploi avec les bon paramètres', async() => {
			// Given
			const httpClientService = anAuthenticatedHttpClientService();
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse([]));
			const repository = new ApiPoleEmploiMetierStage3emeRepository(httpClientService, new NullCacheService(), anErrorManagementService());
			
			// When
			await repository.search('motCle');
			
			// Then
			expect(httpClientService.get).toHaveBeenCalledWith('/appellations');
		});
		
		it('filtre les métiers par mot clé', async () => {
			// Given
			const httpClientService = anAuthenticatedHttpClientService();
			jest.spyOn(httpClientService, 'get').mockResolvedValue(anAxiosResponse([
				{
					code: 'codeMetier',
					libelle: 'libelleMetier',
				},
				{
					code: 'codeMetier2',
					libelle: 'libelleMetier2',
				},
			]));
			const repository = new ApiPoleEmploiMetierStage3emeRepository(httpClientService, new NullCacheService(), anErrorManagementService());

			// When
			const resultat = await repository.search('libelleMetier2') as Success<MetierStage3eme[]>;

			// Then
			expect(resultat.result).toEqual([
				{
					code: 'codeMetier2',
					libelle: 'libelleMetier2',
				},
			]);
		});
	});
});
