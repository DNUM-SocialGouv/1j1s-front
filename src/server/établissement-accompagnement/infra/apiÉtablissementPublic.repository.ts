import { createSuccess, Either } from '~/server/errors/either';
import {
	ÉtablissementAccompagnement,
	ParamètresRechercheÉtablissementAccompagnement,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement';
import {
	ÉtablissementAccompagnementRepository,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement.repository';
import {
	mapÉtablissementAccompagnement,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.mapper';
import {
	apiEtablissementSearchSchemas,
	RésultatRechercheÉtablissementPublicResponse,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.response';
import { validateApiResponse } from '~/server/services/error/apiResponseValidator';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

export class ApiÉtablissementPublicRepository implements ÉtablissementAccompagnementRepository {
	constructor(private readonly httpClient: PublicHttpClientService, private readonly errorManagement: ErrorManagementService) {
	}

	async search(params: ParamètresRechercheÉtablissementAccompagnement): Promise<Either<ÉtablissementAccompagnement[]>> {
		const { commune, typeAccompagnement } = params;
		try {
			const { data } = await this.httpClient.get<RésultatRechercheÉtablissementPublicResponse>(`communes/${commune}/${typeAccompagnement}`);
			const validateSchemasResponse = validateApiResponse(data.features, apiEtablissementSearchSchemas);
			if (validateSchemasResponse) {
				this.errorManagement.logValidationError(validateSchemasResponse, {
					apiSource: 'API Établissement Public',
					contexte: 'search établissement public',
					message: 'erreur de validation du schéma de l‘api',
				});
			}
			return createSuccess(mapÉtablissementAccompagnement(data));
		} catch (error) {
			return this.errorManagement.handleFailureError(error, {
				apiSource: 'API Établissement Public',
				contexte: 'search établissement public',
				message: 'impossible d‘effectuer une recherche d‘établissement public',
			});
		}
	}
}
