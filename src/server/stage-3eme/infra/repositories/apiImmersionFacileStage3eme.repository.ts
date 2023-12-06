import { createSuccess } from '~/server/errors/either';
import { validateApiResponse } from '~/server/services/error/apiResponseValidator';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';
import { Stage3emeRepository } from '~/server/stage-3eme/domain/stage3eme.repository';
import { ApiImmersionFacileStage3emeRechercheResponse, apiImmersionFacileStage3emeSchemas } from '~/server/stage-3eme/infra/repositories/apiImmersionFacileStage3eme';
import { mapRechercheStage3eme } from '~/server/stage-3eme/infra/repositories/apiImmersionFacileStage3eme.mapper';
import { Stage3emeFiltre } from '~/server/stage-3eme/domain/stage3eme';

export class ApiImmersionFacileStage3emeRepository implements Stage3emeRepository {
	constructor(private readonly httpClientService: PublicHttpClientService, private readonly errorManagementService: ErrorManagementService) {
	}

	async search(filtre: Stage3emeFiltre) {
		try {
			const endpoint = '/search?latitude=48.8535&longitude=2.34839&distanceKm=10'
				.concat(filtre.codeMetier ? `&appellationCodes=${filtre.codeMetier}` : '');
			const response = await this.httpClientService.get<Array<ApiImmersionFacileStage3emeRechercheResponse>>(endpoint);
			const apiValidationError = validateApiResponse<Array<ApiImmersionFacileStage3emeRechercheResponse>>(response.data, apiImmersionFacileStage3emeSchemas.search);
			if (apiValidationError) {
				this.errorManagementService.logValidationError(apiValidationError, {
					apiSource: 'API Immersion Facile Stage 3eme',
					contexte: 'search stage 3eme',
					message: 'erreur de validation du schéma de l’api',
				});
			}
			const mappedResponse = mapRechercheStage3eme(response.data);
			return createSuccess(mappedResponse);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Immersion Facile Stage 3eme',
				contexte: 'search stage 3eme',
				message: 'impossible d’effectuer une recherche de stage 3eme',
			});
		}
	}
}
