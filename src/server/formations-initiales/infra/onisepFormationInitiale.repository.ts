import { createSuccess, Either } from '~/server/errors/either';
import {
	FormationInitiale,
	FormationInitialeFiltre, NOMBRE_RÉSULTATS_FORMATIONS_INITIALES_PAR_PAGE,
	ResultatRechercheFormationsInitiales,
} from '~/server/formations-initiales/domain/formationInitiale';
import { FormationInitialeRepository } from '~/server/formations-initiales/domain/formationInitiale.repository';
import {
	formationInitialeMapper,
	formationInitialeRechercheMapper,
} from '~/server/formations-initiales/infra/formationInitiale.mapper';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

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

const ONISEP_FORMATIONS_INITIALES_DATASET_ID = '5fa591127f501';

export class OnisepFormationInitialeRepository implements FormationInitialeRepository {
	constructor(private readonly httpClient: PublicHttpClientService, private readonly errorManagementService: ErrorManagementService) {
	}

	async search(filtre: FormationInitialeFiltre): Promise<Either<ResultatRechercheFormationsInitiales>> {
		try {
			const apiQueryParams = this.createApiQueryParams(filtre);
			const apiResponse = await this.httpClient.get<ResultatRechercheFormationInitialeApiResponse>(`/dataset/${ONISEP_FORMATIONS_INITIALES_DATASET_ID}/search?${apiQueryParams}`);
			const formationsInitialesApiResponse = apiResponse.data;
			const formationsInitialesMapped = formationInitialeRechercheMapper(formationsInitialesApiResponse);
			return createSuccess(formationsInitialesMapped);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: '[API Onisep]',
				contexte: 'recherche de formation initiale',
				message: 'impossible d’effectuer une recherche de formation initiale',
			});
		}
	}
	private createApiQueryParams(filtre: FormationInitialeFiltre) {
		const from = String((filtre.page - 1 ) * NOMBRE_RÉSULTATS_FORMATIONS_INITIALES_PAR_PAGE);
		return new URLSearchParams({ from, q: filtre.motCle || '', size: String(NOMBRE_RÉSULTATS_FORMATIONS_INITIALES_PAR_PAGE) });
	}

	async getDetail(id: string): Promise<Either<FormationInitiale>> {
		try {
			const apiResponse = await this.httpClient.get<ResultatRechercheFormationInitialeApiResponse>(`/dataset/${ONISEP_FORMATIONS_INITIALES_DATASET_ID}/search?q=${id}`);
			const formationInitialeApiResponse = apiResponse.data.results[0];
			const formationsInitiales = formationInitialeMapper(formationInitialeApiResponse);
			return createSuccess(formationsInitiales);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: '[API Onisep]',
				contexte: 'détail d‘une formation initiale',
				message: 'impossible de récupérer le détail d‘une formation initiale',
			});
		}
	}
}
