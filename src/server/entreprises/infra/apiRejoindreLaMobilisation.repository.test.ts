import {
	anEntreprise,
} from '~/client/services/lesEntreprisesSEngagent/lesEntreprisesSEngagentService.fixture';
import { ApiRejoindreLaMobilisationRepository } from '~/server/entreprises/infra/apiRejoindreLaMobilisation.repository';
import { createFailure, createSuccess, Failure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';
import { anAxiosResponse, aPublicHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';

const logInformation = aLogInformation({
	apiSource: 'API Rejoindre Mobilisation',
	contexte: 'formulaire rejoindre la mobilisation',
	message: 'impossible d’envoyer le formulaire',
});

describe('ApiRejoindreLaMobilisationRepository', () => {
	describe('.save', () => {
		let repository: ApiRejoindreLaMobilisationRepository;
		let httpClientService: PublicHttpClientService;
		let errorManagementService: ErrorManagementService;
		beforeEach(() => {
			httpClientService = aPublicHttpClientService();
			errorManagementService = anErrorManagementService();
			repository = new ApiRejoindreLaMobilisationRepository(httpClientService, errorManagementService);
		});

		it('envoie un POST vers l‘API des entreprise s‘engagent', async () => {
			// Given
			const entreprise = anEntreprise();
			jest.spyOn(httpClientService, 'post').mockResolvedValue(anAxiosResponse({}, 201));
			// When
			const result = await repository.save(entreprise);

			// Then
			expect(result).toEqual(createSuccess(undefined));
			expect(httpClientService.post).toHaveBeenCalledTimes(1);
		});

		it('résout une erreur quand le service est indisponible', async () => {
			// Given
			const expectedFailure = ErreurMétier.SERVICE_INDISPONIBLE;
			const entreprise = anEntreprise();
			const errorHttp = anHttpError(503);
			jest.spyOn(httpClientService, 'post').mockRejectedValue(errorHttp);
			jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValue(createFailure(expectedFailure));

			// When
			const result = await repository.save(entreprise);

			// Then
			expect(errorManagementService.handleFailureError).toHaveBeenCalledTimes(1);
			expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(errorHttp, logInformation);
			expect(result.instance).toEqual('failure');
			expect((result as Failure).errorType).toEqual(expectedFailure);
		});
	});
});
