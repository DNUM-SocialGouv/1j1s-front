import { AxiosResponse, isAxiosError } from 'axios';

import { handleSearchFailureError } from '~/server/alternances/infra/repositories/apiLaBonneAlternanceError';
import { createFailure, createSuccess, Either, isSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { Formation, FormationFiltre, RésultatRechercheFormation } from '~/server/formations/domain/formation';
import { FormationRepository } from '~/server/formations/domain/formation.repository';
import {
	ApiLaBonneAlternanceFormationRechercheResponse,
	ApiLaBonneAlternanceFormationResponse, AppointmentRequest,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation';
import {
	mapFormation,
	mapRésultatRechercheFormation,
	mapRésultatRechercheFormationToFormation, parseIdFormation,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation.mapper';
import { HttpClientService } from '~/server/services/http/httpClientService';

const DEMANDE_RENDEZ_VOUS_REFERRER = 'jeune_1_solution';
export const ID_FORMATION_SEPARATOR = '__';

export class ApiLaBonneAlternanceFormationRepository implements FormationRepository {
	constructor(private httpClientService: HttpClientService, private caller: string) {}

	async search(filtre: FormationFiltre): Promise<Either<Array<RésultatRechercheFormation>>> {
		const searchResult = await this.searchFormationWithFiltre(filtre);
		if (isSuccess(searchResult)) {
			return createSuccess(mapRésultatRechercheFormation(searchResult.result));
		}
		return searchResult;
	}

	private async searchFormationWithFiltre(filtre: FormationFiltre): Promise<Either<ApiLaBonneAlternanceFormationRechercheResponse>> {
		const endpoint = this.getEndPointWithQueryParams(filtre);
		try {
			const response = await this.httpClientService.get<ApiLaBonneAlternanceFormationRechercheResponse>(endpoint);
			return createSuccess(response.data);
		} catch (e) {
			return handleSearchFailureError(e, 'la bonne alternance recherche formation');
		}
	}

	private getEndPointWithQueryParams(filtre: FormationFiltre): string {
		const codeRomes = filtre.codeRomes.join(',');
		return '/v1/formations?'
			.concat(`caller=${this.caller}`)
			.concat(`&romes=${codeRomes}`)
			.concat(`&insee=${filtre.codeCommune}`)
			.concat(`&longitude=${filtre.longitudeCommune}`)
			.concat(`&latitude=${filtre.latitudeCommune}`)
			.concat(`&radius=${filtre.distanceCommune}`)
			.concat(filtre.niveauEtudes ? `&diploma=${filtre.niveauEtudes}` : '');
	}

	private static isFormationNotFound(e: AxiosResponse<{ error: string }>): boolean {
		return e.status === 500 && e.data.error === 'internal_error';
	}

	async get(id: string, filtreRecherchePourRetrouverLaFormation?: FormationFiltre): Promise<Either<Formation>> {
		const { idRco: formationId, cleMinistereEducatif } = parseIdFormation(id);
		try {
			const apiResponse = await this.httpClientService.get<ApiLaBonneAlternanceFormationResponse>(`/v1/formations/formationDescription/${formationId}`);
			const formation = mapFormation(apiResponse.data);
			formation.lienDemandeRendezVous = await this.getFormationLienRendezVous(cleMinistereEducatif);
			return createSuccess(formation);
		} catch (e) {
			if (ApiLaBonneAlternanceFormationRepository.isSearchDoable(e) && filtreRecherchePourRetrouverLaFormation) {
				try {
					const formation = await this.getFormationFromRésultatsRecherche(filtreRecherchePourRetrouverLaFormation, id);
					formation.lienDemandeRendezVous = await this.getFormationLienRendezVous(cleMinistereEducatif);
					return createSuccess(formation);
				} catch (error) {
					return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
				}
			}
			return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
		}
	}

	private static isSearchDoable(e: unknown) {
		return isAxiosError(e) && e.response && ApiLaBonneAlternanceFormationRepository.isFormationNotFound(e.response);
	}

	private async getFormationFromRésultatsRecherche(filtre: FormationFiltre, id: string): Promise<Formation> {
		const searchResult = await this.search(filtre);
		if (isSuccess(searchResult)) {
			const résultatRechercheFormation = searchResult.result.find((f) => f.id === id);
			if (résultatRechercheFormation) {
				return mapRésultatRechercheFormationToFormation(résultatRechercheFormation);
			}
			return Promise.reject(ErreurMétier.DEMANDE_INCORRECTE);
		}
		return Promise.reject(searchResult.errorType);
	}

	private async getFormationLienRendezVous(cleMinistereEducatif: string | undefined): Promise<string | undefined> {
		try {
			if (!cleMinistereEducatif) {
				return undefined;
			}
			const response: AxiosResponse<AppointmentRequest> = await this.httpClientService.post(
				'/appointment-request/context/create',
				{
					idCleMinistereEducatif: cleMinistereEducatif,
					referrer: DEMANDE_RENDEZ_VOUS_REFERRER,
				},
			);
			return response.data.form_url;
		} catch (e) {
			return undefined;
		}
	}
}
