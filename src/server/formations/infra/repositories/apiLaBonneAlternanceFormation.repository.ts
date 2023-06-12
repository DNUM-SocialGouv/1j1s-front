import { createSuccess, Either, isSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { Formation, FormationFiltre, RésultatRechercheFormation } from '~/server/formations/domain/formation';
import { FormationRepository } from '~/server/formations/domain/formation.repository';
import {
	ApiLaBonneAlternanceFormationRechercheResponse,
	ApiLaBonneAlternanceFormationResponse,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation';
import {
	mapFormation,
	mapRésultatRechercheFormation,
	mapRésultatRechercheFormationToFormation,
	parseIdFormation,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation.mapper';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { isHttpError } from '~/server/services/http/httpError';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';

const DEMANDE_RENDEZ_VOUS_REFERRER = 'jeune_1_solution';
export const ID_FORMATION_SEPARATOR = '__';

export class ApiLaBonneAlternanceFormationRepository implements FormationRepository {
	constructor(private readonly httpClientService: PublicHttpClientService, private readonly caller: string, private readonly errorManagementService: ErrorManagementService) {}

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
		} catch (error) {
			return this.errorManagementService.handleFailureError(error,
				{
					apiSource: 'API LaBonneAlternance',
					contexte: 'search formation la bonne alternance',
					message: '[API LaBonneAlternance] impossible d’effectuer une recherche de formation',
				});
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

	async get(id: string, filtreRecherchePourRetrouverLaFormation?: FormationFiltre): Promise<Either<Formation>> {
		const { idRco: formationId, cleMinistereEducatif } = parseIdFormation(id);
		try {
			const apiResponse = await this.httpClientService.get<ApiLaBonneAlternanceFormationResponse>(`/v1/formations/formationDescription/${formationId}`);
			const formation = mapFormation(apiResponse.data);
			formation.lienDemandeRendezVous = await this.getFormationLienRendezVous(cleMinistereEducatif);
			return createSuccess(formation);
		} catch (error) {
			if (ApiLaBonneAlternanceFormationRepository.isErrorBecauseLbaFailedToRequestTheirDependencies(error) && filtreRecherchePourRetrouverLaFormation) {
				return await this.getFormationFromSearch(filtreRecherchePourRetrouverLaFormation, id, cleMinistereEducatif);
			}
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API LaBonneAlternance',
				contexte: 'get formation la bonne alternance',
				message: '[API LaBonneAlternance] impossible de récupérer le détail d’une formation',
			});
		}
	}

	private async getFormationFromSearch(filtreRecherchePourRetrouverLaFormation: FormationFiltre, id: string, cleMinistereEducatif: string | undefined) {
		const formationOrError = await this.getFormationFromRésultatsRecherche(filtreRecherchePourRetrouverLaFormation, id);
		if (isSuccess(formationOrError)) {
			const formation = formationOrError.result;
			formation.lienDemandeRendezVous = await this.getFormationLienRendezVous(cleMinistereEducatif);
			return createSuccess(formation);
		}
		return formationOrError;
	}

	private static isErrorBecauseLbaFailedToRequestTheirDependencies(error: unknown) {
		return isHttpError(error)
			&& error.response !== undefined
			&& error.response.status === 500
			&& error.response.data.error === 'internal_error';
	}

	private async getFormationFromRésultatsRecherche(filtre: FormationFiltre, id: string): Promise<Either<Formation>> {
		const searchResultOrError = await this.search(filtre);
		if (isSuccess(searchResultOrError)) {
			const résultatRechercheFormation = searchResultOrError.result.find((f) => f.id === id);
			if (résultatRechercheFormation) {
				return createSuccess(mapRésultatRechercheFormationToFormation(résultatRechercheFormation));
			}
			return this.errorManagementService.handleFailureError(ErreurMétier.DEMANDE_INCORRECTE, {
				apiSource: 'API LaBonneAlternance',
				contexte: 'get formation la bonne alternance',
				message: '[API LaBonneAlternance] impossible de récupérer le détail d’une formation en effectuant de nouveau la recherche',
			});
		}
		return searchResultOrError;
	}

	private async getFormationLienRendezVous(cleMinistereEducatif: string | undefined): Promise<string | undefined> {
		try {
			if (!cleMinistereEducatif) {
				return undefined;
			}
			const response = await this.httpClientService.post<{ idCleMinistereEducatif: string, referrer: string }, { form_url: string }>(
				'/appointment-request/context/create',
				{
					idCleMinistereEducatif: cleMinistereEducatif,
					referrer: DEMANDE_RENDEZ_VOUS_REFERRER,
				},
			);
			return response.data.form_url;
		} catch (error) {
			this.errorManagementService.handleFailureError(error, {
				apiSource: 'API LaBonneAlternance',
				contexte: 'get formation la bonne alternance',
				message: '[API LaBonneAlternance] impossible de créer le lien de demande de rdv pour une formation',
			});
			return undefined;
		}
	}
}
