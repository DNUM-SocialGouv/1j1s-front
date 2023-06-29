import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { aFormationInitiale } from '~/server/formations-initiales/domain/formationInitiale.fixture';
import {
	aFormationInitialeFiltre,
	aResultatRechercheFormationInitialeApiResponse,
} from '~/server/formations-initiales/infra/formationInitialeResponse.fixture';
import {
	OnisepFormationInitialeRepository,
} from '~/server/formations-initiales/infra/onisepFormationInitiale.repository';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import {
	anAuthenticatedHttpClientService,
	anAxiosResponse,
} from '~/server/services/http/publicHttpClient.service.fixture';

describe('onisep formation initiale repository', () => {
	describe('search', () => {
		it('doit appeler l’api onisep avec les bons paramètres', async () => {
			// GIVEN
			const httpClient = anAuthenticatedHttpClientService();
			const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, anErrorManagementService());
			const filtre = aFormationInitialeFiltre({ motCle: 'informatique' });

			// WHEN
			await formationInitialeRepository.search(filtre);

			// THEN
			expect(httpClient.get).toHaveBeenCalledWith('/dataset/5fa591127f501/search?q=informatique');
		});

		it('doit retourner les formations initiales', async () => {
			// GIVEN
			const httpClient = anAuthenticatedHttpClientService();
			const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, anErrorManagementService());
			const responseFromApi = anAxiosResponse(aResultatRechercheFormationInitialeApiResponse());
			const expectedFormationsInitiales = createSuccess([aFormationInitiale()]);
			const filtre = aFormationInitialeFiltre();
			jest.spyOn(httpClient, 'get').mockResolvedValueOnce(responseFromApi);

			// WHEN
			const formationsInitiales = await formationInitialeRepository.search(filtre);

			// THEN
			expect(formationsInitiales).toStrictEqual(expectedFormationsInitiales);
		});

		describe('en cas d’erreur', () => {
			it('doit logguer les informations de l’erreur', async () => {
				// GIVEN
				const httpClient = anAuthenticatedHttpClientService();
				const errorManagementService = anErrorManagementService();
				const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, errorManagementService);
				const httpError = anHttpError(500);
				const filtre = aFormationInitialeFiltre();
				jest.spyOn(httpClient, 'get').mockRejectedValueOnce(httpError);

				// WHEN
				await formationInitialeRepository.search(filtre);

				// THEN
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, aLogInformation({
					apiSource: '[API Onisep]',
					contexte: 'recherche de formation initiale',
					message: 'impossible d’effectuer une recherche de formation initiale',
				}));
			});

			it('doit retourner une erreur métier correspondante', async () => {
				// GIVEN
				const httpClient = anAuthenticatedHttpClientService();
				const errorManagementService = anErrorManagementService();
				const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, errorManagementService);
				const httpError = anHttpError(500);
				const expectedErrorFromErromManagement = createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
				const filtre = aFormationInitialeFiltre();
				jest.spyOn(httpClient, 'get').mockRejectedValueOnce(httpError);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValueOnce(expectedErrorFromErromManagement);

				// WHEN
				const businessError = await formationInitialeRepository.search(filtre);

				// THEN
				expect(businessError).toStrictEqual(expectedErrorFromErromManagement);
			});
		});
	});
});
