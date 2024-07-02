import { CmsService } from '~/server/cms/domain/cmsService';
import { createSuccess, Either, isFailure } from '~/server/errors/either';
import {
	FormationInitiale,
	FormationInitialeDetailAvecInformationsComplementaires,
	FormationInitialeFiltre,
	NOMBRE_RÉSULTATS_FORMATIONS_INITIALES_PAR_PAGE,
	ResultatRechercheFormationsInitiales,
} from '~/server/formations-initiales/domain/formationInitiale';
import { FormationInitialeRepository } from '~/server/formations-initiales/domain/formationInitiale.repository';
import {
	mapFormationInitialeDetailFromOnisep,
	mapFormationInitialeDetailFromStrapi,
	mapRechercheformationInitiale,
} from '~/server/formations-initiales/infra/formationInitiale.mapper';
import {
	ResultatRechercheFormationInitialeApiResponse,
} from '~/server/formations-initiales/infra/onisepFormationInitiale';
import { StrapiFormationInitialeDetail } from '~/server/formations-initiales/infra/strapiFormationInitialeDetail';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

export const RESSOURCE_FORMATION_INITIALE= 'formation-initiale-details';

const ONISEP_FORMATIONS_INITIALES_DATASET_ID = '5fa591127f501';

export class OnisepFormationInitialeRepository implements FormationInitialeRepository {
	constructor(private readonly httpClient: PublicHttpClientService, private readonly errorManagementService: ErrorManagementService, private readonly strapiService: CmsService) {
	}

	async search(filtre: FormationInitialeFiltre): Promise<Either<ResultatRechercheFormationsInitiales>> {
		try {
			const apiQueryParams = this.createApiQueryParams(filtre);
			const apiResponse = await this.httpClient.get<ResultatRechercheFormationInitialeApiResponse>(`/dataset/${ONISEP_FORMATIONS_INITIALES_DATASET_ID}/search?${apiQueryParams}`);
			const formationsInitialesApiResponse = apiResponse.data;
			const formationsInitialesMapped = mapRechercheformationInitiale(formationsInitialesApiResponse);
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
		const from = String((filtre.page - 1) * NOMBRE_RÉSULTATS_FORMATIONS_INITIALES_PAR_PAGE);
		return new URLSearchParams({
			from,
			q: filtre.motCle || '',
			size: String(NOMBRE_RÉSULTATS_FORMATIONS_INITIALES_PAR_PAGE),
		});
	}

	async getFormationInitialeDetail(id: string): Promise<Either<FormationInitialeDetailAvecInformationsComplementaires>> {
		const formationInitialeFromOnisep = await this.getFormationInitialeDetailFromOnisep(id);
		if (isFailure(formationInitialeFromOnisep)) return formationInitialeFromOnisep;

		const query = `filters[identifiant][$eq]=${id}`;
		const additionalInformationFormationInitialFromStrapi = await this.strapiService.getFirstFromCollectionType<StrapiFormationInitialeDetail>(RESSOURCE_FORMATION_INITIALE, query);
		if (isFailure(additionalInformationFormationInitialFromStrapi)) {
			return formationInitialeFromOnisep;
		}

		return createSuccess({ ...formationInitialeFromOnisep.result, ...mapFormationInitialeDetailFromStrapi(additionalInformationFormationInitialFromStrapi.result) });
	}

	private async getFormationInitialeDetailFromOnisep(id: string): Promise<Either<FormationInitiale>> {
		try {
			const apiResponse = await this.httpClient.get<ResultatRechercheFormationInitialeApiResponse>(`/dataset/${ONISEP_FORMATIONS_INITIALES_DATASET_ID}/search?q="${id}"`);
			const formationInitialeApiResponse = apiResponse.data.results[0];
			const formationsInitiales = mapFormationInitialeDetailFromOnisep(formationInitialeApiResponse);
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
