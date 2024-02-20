import { createSuccess, Either } from '~/server/errors/either';
import {
	mapEtablissementPublicAccompagnement,
} from '~/server/etablissement-accompagnement/infra/apiEtablissementPublic.mapper';
import {
	apiEtablissementPublicSearchSchemas, ResultatRechercheEtablissementPublicResponse,
} from '~/server/etablissement-accompagnement/infra/apiEtablissementPublic.response';
import { validateApiResponse } from '~/server/services/error/apiResponseValidator';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

import {
	EtablissementAccompagnement,
	ParametresRechercheEtablissementAccompagnement,
} from '../domain/etablissementAccompagnement';
import {
	EtablissementAccompagnementRepository,
} from '../domain/etablissementAccompagnement.repository';

export class ApiEtablissementPublicRepository implements EtablissementAccompagnementRepository {
	constructor(private readonly httpClient: PublicHttpClientService, private readonly errorManagement: ErrorManagementService) {
	}

	async search(params: ParametresRechercheEtablissementAccompagnement): Promise<Either<Array<EtablissementAccompagnement>>> {
		const { codePostal, typeAccompagnement } = params;
		try {
			const select = 'select=adresse,telephone,adresse_courriel,nom,id,pivot,plage_ouverture';
			const limit = 'limit=100';
			const queryCodePostal = `suggest(adresse,%22code_postal%20${codePostal}%22)`;
			const queryTypeEtablissement = `pivot%20LIKE%20%22${typeAccompagnement}%22`;
			const { data } = await this.httpClient.get<ResultatRechercheEtablissementPublicResponse.EtablissementsPublicList>(`catalog/datasets/api-lannuaire-administration/records?where=${queryCodePostal}and%20${queryTypeEtablissement}&${limit}&${select}`);
			const errorApiSchemaValidation = validateApiResponse(data.results, apiEtablissementPublicSearchSchemas);
			if (errorApiSchemaValidation) {
				this.errorManagement.logValidationError(errorApiSchemaValidation, {
					apiSource: 'API administration et sevice public',
					contexte: 'search établissement public',
					message: 'erreur de validation du schéma de l‘api',
				});
			}
			return createSuccess(mapEtablissementPublicAccompagnement(data.results));
		} catch (error) {
			return this.errorManagement.handleFailureError(error, {
				apiSource: 'API administration et sevice public',
				contexte: 'search établissement public',
				message: 'impossible d‘effectuer une recherche d‘établissement public',
			});
		}
	}
}
