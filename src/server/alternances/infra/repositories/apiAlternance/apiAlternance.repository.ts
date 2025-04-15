import { Alternance, AlternanceFiltre, ResultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import { createSuccess, Either } from '~/server/errors/either';
import { validateApiResponse } from '~/server/services/error/apiResponseValidator';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';

import { AlternanceApiJobsResponse } from './apiAlternance';
import { mapRechercheAlternanceListe } from './apiAlternance.mapper';

export class ApiAlternanceRepository implements AlternanceRepository {
	constructor(
		private readonly httpClient: AuthenticatedHttpClientService,
		private readonly errorManagementServiceSearch: ErrorManagementService,
	) {}

	async search(filtre: AlternanceFiltre): Promise<Either<ResultatRechercheAlternance>> {
		try {
			const response = await this.getAlternanceListe(filtre);
			const apiValidationError = validateApiResponse<AlternanceApiJobsResponse>(response.data, AlternanceApiJobsResponse.validationSchema.search);

			if (apiValidationError) {
				this.errorManagementServiceSearch.logValidationError(apiValidationError, {
					apiSource: 'API Alternance',
					contexte: 'search api alternance recherche alternance',
					message: 'erreur de validation du schéma de l’api',
				});
			}
			return createSuccess(mapRechercheAlternanceListe(response.data));
		} catch (error) {
			return this.errorManagementServiceSearch.handleFailureError(error, {
				apiSource: 'API Alternance',
				contexte: 'search api alternance recherche alternance',
				message: 'impossible d’effectuer une recherche d’alternance',
			});
		}
	}

	private async getAlternanceListe(filtre: AlternanceFiltre) {
		const codeRomes = filtre.codeRomes.join(',');
		const endpoint = `/job/v1/search?romes=${codeRomes}&longitude=${filtre.longitudeCommune}&latitude=${filtre.latitudeCommune}&radius=${filtre.distanceCommune}`;
		return await this.httpClient.get<AlternanceApiJobsResponse>(endpoint);
	}

	get(id: string): Promise<Either<Alternance>> {
		throw '// FIXME (GAFI 15-04-2025):  Not implemented' + id;
	}
}
