import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';

import { createSuccess, Either } from '../../errors/either';
import { FormationInitiale } from '../domain/formationInitiale';
import { FormationInitialeRepository } from '../domain/formationInitiale.repository';

export interface FormationInitialeApiResponse {
		code_nsf: string,
		sigle_type_formation: string,
		libelle_type_formation: string,
		libelle_formation_principal: string,
		sigle_formation: string,
		duree: string,
		niveau_de_sortie_indicatif: string,
		code_rncp: string,
		niveau_de_certification: string,
		libelle_niveau_de_certification: string,
		tutelle: string,
		url_et_id_onisep: string,
		'domainesous-domaine': string
}

export interface ResultatRechercheFormationInitialeApiResponse {
	total: number
	size: number
	from: number
	results: Array<FormationInitialeApiResponse>
}

export class OnisepFormationInitialeRepository implements FormationInitialeRepository {
	constructor(private readonly httpClient: AuthenticatedHttpClientService, private readonly errorManagementService: ErrorManagementService) {}

	async search(): Promise<Either<Array<FormationInitiale>>> {
		try {
			const apiResponse = await this.httpClient.get<ResultatRechercheFormationInitialeApiResponse>('/dataset/5fa591127f501/search');
			const formationsInitialesApiResponse = apiResponse.data.results;
			const formationsInitiales = formationsInitialesApiResponse.map((formationInitialeApiResponse) => ({ libelle: formationInitialeApiResponse.libelle_formation_principal }));
			return createSuccess(formationsInitiales);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: '[API Onisep]',
				contexte: 'recherche de formation initiale',
				message: 'impossible d’effectuer une recherche de formation initiale',
			});
		}
	}
}
