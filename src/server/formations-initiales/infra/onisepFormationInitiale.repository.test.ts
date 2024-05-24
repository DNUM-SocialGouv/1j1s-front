import { aStrapiService } from '~/server/cms/infra/repositories/strapi.service.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { NOMBRE_RÉSULTATS_FORMATIONS_INITIALES_PAR_PAGE } from '~/server/formations-initiales/domain/formationInitiale';
import {
	aFormationInitiale,
	aFormationInitialeDetailCMS,
	aFormationInitialeDetailComplete,
	aFormationInitialeFiltre,
	aResultatFormationInitiale,
} from '~/server/formations-initiales/domain/formationInitiale.fixture';
import {
	aFormationInitialeApiResponse,
	aResultatRechercheFormationInitialeApiResponse,
} from '~/server/formations-initiales/infra/onisepFormationInitiale.fixture';
import {
	OnisepFormationInitialeRepository,
} from '~/server/formations-initiales/infra/onisepFormationInitiale.repository';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import {
	anAuthenticatedHttpClientService,
	anAxiosResponse,
} from '~/server/services/http/publicHttpClient.service.fixture';

import { aStrapiFormationInitialeDetail } from './strapiFormationIntialeDetail.fixture';

describe('onisep formation initiale repository', () => {
	describe('search', () => {
		it('lorsqu‘il y a un filtre, doit appeler l’api onisep avec les bons paramètres', async () => {
			// GIVEN
			const httpClient = anAuthenticatedHttpClientService();
			const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, anErrorManagementService(), aStrapiService());
			const filtre = aFormationInitialeFiltre({ motCle: 'informatique', page: 1 });

			// WHEN
			await formationInitialeRepository.search(filtre);

			// THEN
			expect(httpClient.get).toHaveBeenCalledWith(`/dataset/5fa591127f501/search?from=0&q=informatique&size=${NOMBRE_RÉSULTATS_FORMATIONS_INITIALES_PAR_PAGE}`);
		});

		it('lorsqu‘il n‘y a pas de filtre et que la recherche est demandée, doit appeler l’api onisep', async () => {
			// GIVEN
			const httpClient = anAuthenticatedHttpClientService();
			const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, anErrorManagementService(), aStrapiService());
			const filtre = aFormationInitialeFiltre({ motCle: undefined });

			// WHEN
			await formationInitialeRepository.search(filtre);

			// THEN
			expect(httpClient.get).toHaveBeenCalledWith(`/dataset/5fa591127f501/search?from=0&q=&size=${NOMBRE_RÉSULTATS_FORMATIONS_INITIALES_PAR_PAGE}`);
		});

		it('gère la pagination', async () => {
			// GIVEN
			const httpClient = anAuthenticatedHttpClientService();
			const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, anErrorManagementService(), aStrapiService());
			const filtre = aFormationInitialeFiltre({ motCle: undefined, page: 3 });

			// WHEN
			await formationInitialeRepository.search(filtre);

			// THEN
			expect(httpClient.get).toHaveBeenCalledWith(`/dataset/5fa591127f501/search?from=30&q=&size=${NOMBRE_RÉSULTATS_FORMATIONS_INITIALES_PAR_PAGE}`);
		});

		it('doit retourner les formations initiales', async () => {
			// GIVEN
			const httpClient = anAuthenticatedHttpClientService();
			const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, anErrorManagementService(), aStrapiService());
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
				const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, errorManagementService, aStrapiService());
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
				const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, errorManagementService, aStrapiService());
				const httpError = anHttpError(500);
				const expectedErrorFromErromManagement = createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
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

	describe('getFormationInitialeDetail', () => {
		it('appelle l’api onisep avec l‘identifiant', async () => {
			// GIVEN
			const httpClient = anAuthenticatedHttpClientService();
			const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, anErrorManagementService(), aStrapiService());
			const identifiant = 'FOR.1234';

			// WHEN
			await formationInitialeRepository.getFormationInitialeDetail(identifiant);

			// THEN
			expect(httpClient.get).toHaveBeenCalledWith(`/dataset/5fa591127f501/search?q="${identifiant}"`);
		});

		describe('succès lors de l‘apel à l‘Onisep', () => {
			it('appelle Strapi pour récupérer les informations supplémentaires sur la formation initiale', async () => {
				const httpClient = anAuthenticatedHttpClientService();
				const resultFormationInitiale = aResultatRechercheFormationInitialeApiResponse();
				jest.spyOn(httpClient, 'get').mockResolvedValueOnce(anAxiosResponse(resultFormationInitiale));
				const strapiService = aStrapiService();
				jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(createSuccess(aStrapiFormationInitialeDetail()));
				const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, anErrorManagementService(), strapiService);

				const identifiant = 'FOR.1234';
				await formationInitialeRepository.getFormationInitialeDetail(identifiant);

				const formationInitialeDetailResourceName = 'formation-initiale-details';
				const strapiQuery = 'filters[identifiant][$eq]=FOR.1234';
				expect(strapiService.getFirstFromCollectionType).toHaveBeenCalledTimes(1);
				expect(strapiService.getFirstFromCollectionType).toHaveBeenCalledWith(formationInitialeDetailResourceName, strapiQuery);
			});

			it('succès lors de la récupération des informations supplémentaires dans Strapi, renvoie la concaténation des deux résultats', async () => {
				const httpClient = anAuthenticatedHttpClientService();
				const resultFormationInitiale = aResultatRechercheFormationInitialeApiResponse({
					results: [aFormationInitialeApiResponse({
						code_nsf: '110',
						duree: '1 an',
						libelle_formation_principal: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
						libelle_type_formation: 'classe préparatoire scientifique et technologique',
						niveau_de_certification: '3',
						niveau_de_sortie_indicatif: 'Bac + 2',
						sigle_type_formation: 'CPGE',
						url_et_id_onisep: 'http://www.onisep.fr/http/redirection/formation/slug/FOR.1234',
					})],
				});
				jest.spyOn(httpClient, 'get').mockResolvedValueOnce(anAxiosResponse(resultFormationInitiale));
				const strapiService = aStrapiService();
				const resultFromStrapi = aStrapiFormationInitialeDetail({
					attendusParcoursup: 'L‘option managament d‘unité de production culinaire vise à maîtriser des techniques culinaires propres aux différents types de restauration',
					conditionsAcces: 'Le diplomé peut débuter comme chef de partie, second de cuisine, avant d‘accéder à des postes d‘encadrement ou de direction.',
					description: 'Je suis une description de formation initiale',
					poursuiteEtudes: 'Le BTS est un diplôme conçu pour une insertion professionnelle',
					updatedAt: '2023-05-15T09:37:44.283Z',
				});
				jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValueOnce(createSuccess(resultFromStrapi));
				const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, anErrorManagementService(), strapiService);

				const identifiant = 'FOR.1234';
				const result = await formationInitialeRepository.getFormationInitialeDetail(identifiant);

				expect(result).toStrictEqual(createSuccess(aFormationInitialeDetailComplete({
					...aFormationInitialeDetailCMS({
						attendusParcoursup: 'L‘option managament d‘unité de production culinaire vise à maîtriser des techniques culinaires propres aux différents types de restauration',
						conditionsAcces: 'Le diplomé peut débuter comme chef de partie, second de cuisine, avant d‘accéder à des postes d‘encadrement ou de direction.',
						dateDeMiseAJour: new Date('2023-05-15T09:37:44.283Z'),
						description: 'Je suis une description de formation initiale',
						poursuiteEtudes: 'Le BTS est un diplôme conçu pour une insertion professionnelle',
					}),
					...aFormationInitiale({
						identifiant: 'FOR.1234',
						libelle: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
						tags: ['Certifiante', 'Bac + 2', '1 an'],
						url_formation: 'http://www.onisep.fr/http/redirection/formation/slug/FOR.1234',
					}),
				})));
			});

			it('erreur lors de la récupération des informations supplémentaires dans Strapi, renvoie le résultat de l‘onisep uniquement', async () => {
				const httpClient = anAuthenticatedHttpClientService();
				const resultFormationInitiale = aResultatRechercheFormationInitialeApiResponse({
					results: [aFormationInitialeApiResponse({
						code_nsf: '110',
						duree: '1 an',
						libelle_formation_principal: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
						libelle_type_formation: 'classe préparatoire scientifique et technologique',
						niveau_de_certification: '3',
						niveau_de_sortie_indicatif: 'Bac + 2',
						sigle_type_formation: 'CPGE',
						url_et_id_onisep: 'http://www.onisep.fr/http/redirection/formation/slug/FOR.1234',
					})],
				});
				jest.spyOn(httpClient, 'get').mockResolvedValueOnce(anAxiosResponse(resultFormationInitiale));
				const strapiService = aStrapiService();
				jest.spyOn(strapiService, 'getFirstFromCollectionType').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));
				const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, anErrorManagementService(), strapiService);

				const identifiant = 'FOR.1234';
				const result = await formationInitialeRepository.getFormationInitialeDetail(identifiant);

				expect(result).toEqual(createSuccess(aFormationInitialeDetailComplete({
					...aFormationInitialeDetailCMS({
						attendusParcoursup: undefined,
						conditionsAcces: undefined,
						dateDeMiseAJour: undefined,
						description: undefined,
						poursuiteEtudes: undefined,
					}),
					...aFormationInitiale({
						identifiant: 'FOR.1234',
						libelle: 'Classe préparatoire Technologie et sciences industrielles (TSI), 2e année',
						tags: ['Certifiante', 'Bac + 2', '1 an'],
						url_formation: 'http://www.onisep.fr/http/redirection/formation/slug/FOR.1234',
					}),
				})));
			});
		});

		describe('erreur lors de l‘apel à l‘Onisep', () => {
			it('doit logguer les informations de l’erreur', async () => {
				// GIVEN
				const httpClient = anAuthenticatedHttpClientService();
				const errorManagementService = anErrorManagementService();
				const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, errorManagementService, aStrapiService());
				const httpError = anHttpError(500);
				jest.spyOn(httpClient, 'get').mockRejectedValueOnce(httpError);
				const identifiant = 'FOR.1234';

				// WHEN
				await formationInitialeRepository.getFormationInitialeDetail(identifiant);

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
				const formationInitialeRepository = new OnisepFormationInitialeRepository(httpClient, errorManagementService, aStrapiService());
				const httpError = anHttpError(500);
				const expectedErrorFromErromManagement = createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
				jest.spyOn(httpClient, 'get').mockRejectedValueOnce(httpError);
				jest.spyOn(errorManagementService, 'handleFailureError').mockReturnValueOnce(expectedErrorFromErromManagement);
				const identifiant = 'FOR.1234';

				// WHEN
				const businessError = await formationInitialeRepository.getFormationInitialeDetail(identifiant);

				// THEN
				expect(businessError).toStrictEqual(expectedErrorFromErromManagement);
			});
		});
	});
});
