import { createSuccess } from '~/server/errors/either';
import { validateApiResponse } from '~/server/services/error/apiResponseValidator';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';
import { Stage3eEt2deFiltre } from '~/server/stage-3e-et-2de/domain/stage3eEt2de';
import { Stage3eEt2deRepository } from '~/server/stage-3e-et-2de/domain/stage3eEt2de.repository';
import {
	ApiImmersionFacileStage3eEt2deRechercheResponse,
	apiImmersionFacileStage3eEt2deSchemas,
} from '~/server/stage-3e-et-2de/infra/repositories/apiImmersionFacileStage3eEt2de';
import {
	mapRechercheStage3eEt2de,
} from '~/server/stage-3e-et-2de/infra/repositories/apiImmersionFacileStage3eEt2de.mapper';

export class ApiImmersionFacileStage3eEt2deRepository implements Stage3eEt2deRepository {
	constructor(private readonly httpClientService: PublicHttpClientService, private readonly errorManagementService: ErrorManagementService) {
	}

	async search(filtre: Stage3eEt2deFiltre) {
		try {
			const endpoint = '/search?'
				.concat('&voluntaryToImmersion=true')
				.concat(`&latitude=${filtre.latitudeCommune}`)
				.concat(`&longitude=${filtre.longitudeCommune}`)
				.concat(`&distanceKm=${filtre.distanceCommune}`)
				.concat(filtre.codeMetier ? `&appellationCodes[]=${filtre.codeMetier}` : '');
			const response = await this.httpClientService.get<Array<ApiImmersionFacileStage3eEt2deRechercheResponse>>(endpoint);
			const apiValidationError = validateApiResponse<Array<ApiImmersionFacileStage3eEt2deRechercheResponse>>(response.data, apiImmersionFacileStage3eEt2deSchemas.search);
			if (apiValidationError) {
				this.errorManagementService.logValidationError(apiValidationError, {
					apiSource: 'API Immersion Facile Stage 3e et 2de',
					contexte: 'search stage 3e et 2de',
					message: 'erreur de validation du schéma de l’api',
				});
			}
			const mappedResponse = mapRechercheStage3eEt2de(response.data);
			return createSuccess(mappedResponse);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Immersion Facile Stage 3e et 2de',
				contexte: 'search stage 3e et 2de',
				message: 'impossible d’effectuer une recherche de stage 3e et 2de',
			});
		}
	}
}
