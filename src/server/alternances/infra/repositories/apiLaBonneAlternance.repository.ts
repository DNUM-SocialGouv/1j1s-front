import {
	Alternance,
	AlternanceFiltre,
	ResultatRechercheAlternance,
} from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import {
	AlternanceApiJobsResponse, apiLaBonneAlternanceSchemas,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import {
	mapAlternanceListe,
	mapMatcha, mapPEJob,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import { createSuccess, Either } from '~/server/errors/either';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

const SOURCES_ALTERNANCE = 'matcha,offres,lba';

const POLE_EMPLOI_ID_LENGTH = 7;

export class ApiLaBonneAlternanceRepository implements AlternanceRepository {
	constructor(private readonly httpClientService: PublicHttpClientService, private readonly caller: string, private readonly errorManagementServiceSearch: ErrorManagementService, private readonly errorManagementServiceGet: ErrorManagementService) {
	}

	async search(filtre: AlternanceFiltre): Promise<Either<ResultatRechercheAlternance>> {
		try {
			const response = await this.getAlternanceListe(filtre);
			const validateSchemasResponse = apiLaBonneAlternanceSchemas.search.validate(response.data);
			if (validateSchemasResponse.error) {
				this.errorManagementServiceSearch.handleValidationError(validateSchemasResponse.error, {
					apiSource: 'API LaBonneAlternance',
					contexte: 'search la bonne alternance recherche alternance',
					message: 'erreur de validation du schéma de l’api',
				});
			}
			return createSuccess(mapAlternanceListe(response.data));
		} catch (error) {
			return this.errorManagementServiceSearch.handleFailureError(error, {
				apiSource: 'API LaBonneAlternance',
				contexte: 'search la bonne alternance recherche alternance',
				message: 'impossible d’effectuer une recherche d’alternance',
			});
		}
	}

	private async getAlternanceListe(filtre: AlternanceFiltre) {
		const codeRomes = filtre.codeRomes.join(',');
		const endpoint = `/v1/jobs?caller=${this.caller}&romes=${codeRomes}&sources=${SOURCES_ALTERNANCE}&insee=${filtre.codeCommune}&longitude=${filtre.longitudeCommune}&latitude=${filtre.latitudeCommune}&radius=${filtre.distanceCommune}`;
		return await this.httpClientService.get<AlternanceApiJobsResponse>(endpoint);
	}

	// Les offres Pole Emploi ont un identifiant de 7 caractères (https://pole-emploi.io/data/api/offres-emploi?tabgroup-api=documentation&doc-section=api-doc-section-consulter-une-offre)
	private static isPoleEmploiId(id: string): boolean {
		return id.length === POLE_EMPLOI_ID_LENGTH;
	}

	async get(id: string): Promise<Either<Alternance>> {
		try {
			if (ApiLaBonneAlternanceRepository.isPoleEmploiId(id)) {
				const apiResponse = await this.httpClientService.get<{
					peJobs: AlternanceApiJobsResponse.PEJobs[]
				}>(`/v1/jobs/job/${id}`);
				const validateSchemasResponse = apiLaBonneAlternanceSchemas.getPoleEmploi.validate(apiResponse.data);
				if (validateSchemasResponse.error) {
					this.errorManagementServiceGet.handleValidationError(validateSchemasResponse.error, {
						apiSource: 'API LaBonneAlternance',
						contexte: 'get détail annonce alternance',
						message: 'erreur de validation du schéma de l’api',
					});
				}
				const offre = apiResponse.data.peJobs[0];
				return createSuccess(mapPEJob(offre));
			}

			const apiResponse = await this.httpClientService.get<{
				matchas: AlternanceApiJobsResponse.Matcha[]
			}>(`/v1/jobs/matcha/${id}`);
			const validateSchemasResponse = apiLaBonneAlternanceSchemas.getMatcha.validate(apiResponse.data);
			if (validateSchemasResponse.error) {
				this.errorManagementServiceGet.handleValidationError(validateSchemasResponse.error, {
					apiSource: 'API LaBonneAlternance',
					contexte: 'get détail annonce alternance',
					message: 'erreur de validation du schéma de l’api',
				});
			}
			const matcha = apiResponse.data.matchas[0];
			return createSuccess(mapMatcha(matcha));
		} catch (error) {
			return this.errorManagementServiceGet.handleFailureError(error, {
				apiSource: 'API LaBonneAlternance',
				contexte: 'get détail annonce alternance',
				message: 'impossible de récupérer le détail d‘une offre d‘alternance',
			});
		}
	}
}
