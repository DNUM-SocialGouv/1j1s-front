import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { NOMBRE_RÉSULTATS_FORMATIONS_INITIALES_PAR_PAGE } from '~/server/formations-initiales/domain/formationInitiale';
import {
	aFormationInitiale,
	aFormationInitialeFiltre, aResultatFormationInitiale,
} from '~/server/formations-initiales/domain/formationInitiale.fixture';
import {
	aFormationInitialeApiResponse,
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
		it('lorsqu‘il y a un filtre, doit appeler l’api onisep avec les bons paramètres', async () => {
			// GIVEN
			const httpClient = anAuthenticatedHttpClientService();
			const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, anErrorManagementService());
			const filtre = aFormationInitialeFiltre({ motCle: 'informatique', page: 1 });

			// WHEN
			await formationInitialeRepository.search(filtre);

			// THEN
			expect(httpClient.get).toHaveBeenCalledWith(`/dataset/5fa591127f501/search?from=0&q=informatique&size=${NOMBRE_RÉSULTATS_FORMATIONS_INITIALES_PAR_PAGE}`);
		});

		it('lorsqu‘il n‘y a pas de filtre et que la recherche est demandée, doit appeler l’api onisep', async () => {
			// GIVEN
			const httpClient = anAuthenticatedHttpClientService();
			const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, anErrorManagementService());
			const filtre = aFormationInitialeFiltre({ motCle: undefined });

			// WHEN
			await formationInitialeRepository.search(filtre);

			// THEN
			expect(httpClient.get).toHaveBeenCalledWith(`/dataset/5fa591127f501/search?from=0&q=&size=${NOMBRE_RÉSULTATS_FORMATIONS_INITIALES_PAR_PAGE}`);
		});

		it('gère la pagination', async () => {
			// GIVEN
			const httpClient = anAuthenticatedHttpClientService();
			const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, anErrorManagementService());
			const filtre = aFormationInitialeFiltre({ motCle: undefined, page: 3 });

			// WHEN
			await formationInitialeRepository.search(filtre);

			// THEN
			expect(httpClient.get).toHaveBeenCalledWith(`/dataset/5fa591127f501/search?from=30&q=&size=${NOMBRE_RÉSULTATS_FORMATIONS_INITIALES_PAR_PAGE}`);
		});

		it('doit retourner les formations initiales', async () => {
			// GIVEN
			const httpClient = anAuthenticatedHttpClientService();
			const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, anErrorManagementService());
			const responseFromApi = anAxiosResponse(aResultatRechercheFormationInitialeApiResponse());
			const formationsInitiales = [aFormationInitiale()];
			const expectedFormationsInitiales = createSuccess(aResultatFormationInitiale({ formationsInitiales: formationsInitiales }));
			const filtre = aFormationInitialeFiltre();
			jest.spyOn(httpClient, 'get').mockResolvedValueOnce(responseFromApi);

			// WHEN
			const resultRecherche = await formationInitialeRepository.search(filtre);

			// THEN
			expect(resultRecherche).toStrictEqual(expectedFormationsInitiales);
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

	describe('getFormationInitiale', () => {
		it('doit appeler l’api onisep avec l‘identifiant', async () => {
			// GIVEN
			const httpClient = anAuthenticatedHttpClientService();
			const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, anErrorManagementService());
			const identifiant = 'FOR.1234';

			// WHEN
			await formationInitialeRepository.getFormationInitiale(identifiant);

			// THEN
			expect(httpClient.get).toHaveBeenCalledWith(`/dataset/5fa591127f501/search?q="${identifiant}"`);
		});

		it('doit retourner la formation initiale', async () => {
			// GIVEN
			const httpClient = anAuthenticatedHttpClientService();
			const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, anErrorManagementService());
			const responseFromApi = anAxiosResponse(aResultatRechercheFormationInitialeApiResponse({
				results: [aFormationInitialeApiResponse()],
			}));
			const expectedFormationsInitialesDetail = createSuccess(aFormationInitiale());
			const identifiant = 'FOR.1234';
			jest.spyOn(httpClient, 'get').mockResolvedValueOnce(responseFromApi);

			// WHEN
			const formationsInitiales = await formationInitialeRepository.getFormationInitiale(identifiant);

			// THEN
			expect(formationsInitiales).toStrictEqual(expectedFormationsInitialesDetail);
		});

		describe('en cas d’erreur', () => {
			it('doit logguer les informations de l’erreur', async () => {
				// GIVEN
				const httpClient = anAuthenticatedHttpClientService();
				const errorManagementService = anErrorManagementService();
				const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, errorManagementService);
				const httpError = anHttpError(500);
				jest.spyOn(httpClient, 'get').mockRejectedValueOnce(httpError);
				const identifiant = 'FOR.1234';

				// WHEN
				await formationInitialeRepository.getFormationInitiale(identifiant);

				// THEN
				expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(httpError, aLogInformation({
					apiSource: '[API Onisep]',
					contexte: 'détail d‘une formation initiale',
					message: 'impossible de récupérer le détail d‘une formation initiale',
				}));
			});

			it('doit retourner une erreur métier correspondante', async () => {
				// GIVEN
				const httpClient = anAuthenticatedHttpClientService();
				const errorManagementService = anErrorManagementService();
				const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, errorManagementService);
				const httpError = anHttpError(500);
				const expectedErrorFromErromManagement = createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
				jest.spyOn(httpClient, 'get').mockRejectedValueOnce(httpError);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValueOnce(expectedErrorFromErromManagement);
				const identifiant = 'FOR.1234';

				// WHEN
				const businessError = await formationInitialeRepository.getFormationInitiale(identifiant);

				// THEN
				expect(businessError).toStrictEqual(expectedErrorFromErromManagement);
			});
		});
	});
});
