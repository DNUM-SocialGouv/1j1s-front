import { AxiosError, AxiosResponse, isAxiosError } from 'axios';

import { handleSearchFailureError } from '~/server/alternances/infra/repositories/apiLaBonneAlternanceError';
import { createSuccess, Either, isSuccess } from '~/server/errors/either';
import { Formation, FormationFiltre,RésultatRechercheFormation } from '~/server/formations/domain/formation';
import { FormationRepository } from '~/server/formations/domain/formation.repository';
import { HttpClientService } from '~/server/services/http/httpClientService';

import {
	ApiLaBonneAlternanceFormationRechercheResponse,
	ApiLaBonneAlternanceFormationResponse,
} from './apiLaBonneAlternanceFormation';
import {
	mapFormation,
	mapRésultatRechercheFormation,
	mapRésultatRechercheFormationToFormation,
} from './apiLaBonneAlternanceFormation.mapper';

export class ApiLaBonneAlternanceFormationRepository implements FormationRepository {
	constructor(private httpClientService: HttpClientService, private caller: string) {}

	async search(filtre: FormationFiltre): Promise<Either<Array<RésultatRechercheFormation>>> {
		const endpoint = this.getEndPoint(filtre);
		try {
			const response = await this.httpClientService.get<ApiLaBonneAlternanceFormationRechercheResponse>(endpoint);
			return createSuccess(mapRésultatRechercheFormation(response.data));
		} catch (e) {
			return handleSearchFailureError(e, 'la bonne alternance recherche formation');
		}
	}

	private getEndPoint(filtre: FormationFiltre): string {
		const codeRomes = filtre.codeRomes.join(',');
		return '/formations?'
			.concat(`caller=${this.caller}`)
			.concat(`&romes=${codeRomes}`)
			.concat(`&insee=${filtre.codeCommune}`)
			.concat(`&longitude=${filtre.longitudeCommune}`)
			.concat(`&latitude=${filtre.latitudeCommune}`)
			.concat(`&radius=${filtre.distanceCommune}`)
			.concat(filtre.niveauEtude ? `&diploma=${filtre.niveauEtude}` : '');
	}

	private static isFormationNotFound(e: AxiosResponse<{ error: string }>): boolean {
		return e.status === 500 && e.data.error === 'internal_error';
	}

	async get(id: string, filtre?: FormationFiltre): Promise<Either<Formation>> {
		try {
			const apiResponse = await this.httpClientService.get<ApiLaBonneAlternanceFormationResponse>(`/formations/formationDescription/${id}`);
			const formation = mapFormation(apiResponse.data);
			return createSuccess(formation);
		} catch (e) {

			if (isAxiosError(e) && e.response && ApiLaBonneAlternanceFormationRepository.isFormationNotFound(e.response)) {
				if (filtre) {
					return await this.getFormationFromRésultatsRecherche(filtre, id, e);
				}
			}
			return handleSearchFailureError(e, 'détail formation la bonne alternance description');
		}
	}

	private async getFormationFromRésultatsRecherche(filtre: FormationFiltre, id: string, e: AxiosError) {
		const searchResult = await this.search(filtre);
		if (isSuccess(searchResult)) {
			const résultatRechercheFormation = searchResult.result.find((f) => f.idRco === id);
			if (résultatRechercheFormation) {
				return createSuccess(mapRésultatRechercheFormationToFormation(résultatRechercheFormation));
			}
		}
		return handleSearchFailureError(e, 'détail formation la bonne alternance description');
	}
}
