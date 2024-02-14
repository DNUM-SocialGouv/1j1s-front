import {
	SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM,
} from '~/server/entreprises/domain/EntrepriseSouhaitantSEngager';
import { anEntrepriseSouhaitantSEngager } from '~/server/entreprises/domain/EntrepriseSouhaitantSEngager.fixture';
import {
	anApiLesEntreprisesSEngagentCompany,
} from '~/server/entreprises/infra/apiLesEntreprisesSEngagentCompany.fixture';
import { ApiRejoindreLaMobilisationRepository } from '~/server/entreprises/infra/apiRejoindreLaMobilisation.repository';
import { createFailure, createSuccess, Failure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { ErrorManagementService, Severity } from '~/server/services/error/errorManagement.service';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';
import { anAxiosResponse, aPublicHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';

const logInformation = aLogInformation({
	apiSource: 'API Rejoindre Mobilisation',
	contexte: 'formulaire rejoindre la mobilisation',
	message: 'impossible d’envoyer le formulaire',
	severity: Severity.FATAL,
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
			const entreprise = anEntrepriseSouhaitantSEngager({
				codePostal: '75015',
				email: 'machin.chose@bidule.com',
				nom: 'Chose',
				nomSociété: 'Bidule co.',
				prénom: 'Machin',
				secteur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.OTHER_SERVICES,
				siret: '12345678901114',
				taille: 'medium',
				travail: 'Chef',
				téléphone: '+33123456789',
				ville: 'Paris (15e arrondissement)',
			});
			jest.spyOn(httpClientService, 'post').mockResolvedValue(anAxiosResponse({}, 201));

			// When
			const result = await repository.save(entreprise);

			// Then
			expect(result).toEqual(createSuccess(undefined));
			expect(httpClientService.post).toHaveBeenCalledTimes(1);
			expect(httpClientService.post).toHaveBeenCalledWith('/api/members', anApiLesEntreprisesSEngagentCompany({
				companyName: 'Bidule co.',
				companyPostalCode: '75015',
				companySector: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.OTHER_SERVICES,
				companySiret: '12345678901114',
				companySize: 'medium',
				email: 'machin.chose@bidule.com',
				firstname: 'Machin',
				from1j1s: true,
				hasAgreedToCGU: false,
				job: 'Chef',
				lastname: 'Chose',
				phone: '+33123456789',
				whereDidYouKnowUs: 'service-public',
			}));
		});

		it('résout une erreur quand le service est indisponible', async () => {
			// Given
			const expectedFailure = ErreurMetier.SERVICE_INDISPONIBLE;
			const entreprise = anEntrepriseSouhaitantSEngager();
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
