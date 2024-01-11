import { createSuccess } from '~/server/errors/either';
import { validateApiResponse } from '~/server/services/error/apiResponseValidator';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';
import { Stage3emeEt2ndFiltre } from '~/server/stage-3eme-et-2nd/domain/stage3emeEt2nd';
import { Stage3emeEt2ndRepository } from '~/server/stage-3eme-et-2nd/domain/stage3emeEt2nd.repository';
import {
	ApiImmersionFacileStage3emeEt2ndRechercheResponse,
	apiImmersionFacileStage3emeEt2ndSchemas,
} from '~/server/stage-3eme-et-2nd/infra/repositories/apiImmersionFacileStage3emeEt2nd';
import {
	mapRechercheStage3emeEt2nd,
} from '~/server/stage-3eme-et-2nd/infra/repositories/apiImmersionFacileStage3emeEt2nd.mapper';

export class ApiImmersionFacileStage3emeEt2ndRepository implements Stage3emeEt2ndRepository {
	constructor(private readonly httpClientService: PublicHttpClientService, private readonly errorManagementService: ErrorManagementService) {
	}

	async search(filtre: Stage3emeEt2ndFiltre) {
		try {
			const endpoint = '/search?'
				.concat('&voluntaryToImmersion=true')
				.concat(`&latitude=${filtre.latitudeCommune}`)
				.concat(`&longitude=${filtre.longitudeCommune}`)
				.concat(`&distanceKm=${filtre.distanceCommune}`)
				.concat(filtre.codeMetier ? `&appellationCodes[]=${filtre.codeMetier}` : '');
			const response = await this.httpClientService.get<Array<ApiImmersionFacileStage3emeEt2ndRechercheResponse>>(endpoint);
			const apiValidationError = validateApiResponse<Array<ApiImmersionFacileStage3emeEt2ndRechercheResponse>>(response.data, apiImmersionFacileStage3emeEt2ndSchemas.search);
			if (apiValidationError) {
				this.errorManagementService.logValidationError(apiValidationError, {
					apiSource: 'API Immersion Facile Stage 3eme et 2nd',
					contexte: 'search stage 3eme et 2nd',
					message: 'erreur de validation du schéma de l’api',
				});
			}
			const mappedResponse = mapRechercheStage3emeEt2nd(response.data);
			return createSuccess(mappedResponse);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Immersion Facile Stage 3eme et 2nd',
				contexte: 'search stage 3eme et 2nd',
				message: 'impossible d’effectuer une recherche de stage 3eme et 2nd',
			});
		}
	}
}
