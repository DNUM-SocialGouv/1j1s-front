import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

import { createSuccess, Either } from '../../errors/either';
import { FormationInitiale, FormationInitialeFiltre } from '../domain/formationInitiale';
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
} // TODO fin dev formation-initiale : supprimer les champs dont on a pas besoin

export interface ResultatRechercheFormationInitialeApiResponse {
	total: number
	size: number
	from: number
	results: Array<FormationInitialeApiResponse>
}

export class OnisepFormationInitialeRepository implements FormationInitialeRepository {
	constructor(private readonly httpClient: PublicHttpClientService, private readonly errorManagementService: ErrorManagementService) {}

	async search(filtre: FormationInitialeFiltre): Promise<Either<Array<FormationInitiale>>> {
		const ONISEP_FORMATIONS_INITIALES_DATASET_ID = '5fa591127f501';
		try {
			const apiResponse = await this.httpClient.get<ResultatRechercheFormationInitialeApiResponse>(`/dataset/${ONISEP_FORMATIONS_INITIALES_DATASET_ID}/search?q=${filtre.motCle}`);
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
