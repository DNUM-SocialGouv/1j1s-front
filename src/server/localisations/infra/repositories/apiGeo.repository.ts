import { createSuccess, Either } from '~/server/errors/either';
import { Localisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import RechercheLocalisationUtils from '~/server/localisations/domain/rechercheLocalisationUtils';
import { getCodeRegion, mapLocalisationList } from '~/server/localisations/infra/repositories/apiGeo.mapper';
import { ApiDecoupageAdministratifResponse } from '~/server/localisations/infra/repositories/apiGeo.response';
import { removeParenthesis } from '~/server/localisations/infra/repositories/removeParenthesis';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { CachedHttpClientService } from '~/server/services/http/cachedHttpClient.service';

export class ApiGeoRepository implements LocalisationRepository {
	constructor(private readonly httpClientService: CachedHttpClientService, private readonly errorManagementService: ErrorManagementService) {
	}

	async getCommuneListByNom(communeRecherchee: string): Promise<Either<Localisation[]>> {
		const endpoint = `communes?nom=${communeRecherchee}`;
		const contexte = 'communes';
		return this.request<ApiDecoupageAdministratifResponse[], Localisation[]>(endpoint, mapLocalisationList, contexte);
	}

	async getCommuneListByCodePostal(codePostalRecherche: string): Promise<Either<Localisation[]>> {
		const endpoint = `communes?codePostal=${codePostalRecherche}`;
		const contexte = 'communes';
		return this.request<ApiDecoupageAdministratifResponse[], Localisation[]>(endpoint, mapLocalisationList, contexte);
	}

	async getCommuneListByNuméroDépartement(numéroDépartementRecherche: string): Promise<Either<Localisation[]>> {
		const endpoint = `departements/${numéroDépartementRecherche}/communes`;
		const contexte = 'communes';
		return this.request<ApiDecoupageAdministratifResponse[], Localisation[]>(endpoint, mapLocalisationList, contexte);
	}

	async getDépartementListByNom(departementRecherche: string): Promise<Either<Localisation[]>> {
		const departementRechercheWithoutParenthesis = removeParenthesis(departementRecherche);
		let departementQuery;

		if (RechercheLocalisationUtils.isRechercheConcerneDepartementCorse(departementRechercheWithoutParenthesis)) {
			const corseSansCodeDepartement = departementRechercheWithoutParenthesis.replace(RechercheLocalisationUtils.DEPARTEMENT_CORSE_REGEX, '').trim();
			departementQuery = corseSansCodeDepartement;
		} else {
			departementQuery = departementRechercheWithoutParenthesis;
		}

		const endpoint = `departements?nom=${departementQuery}`;
		const contexte = 'départements';
		return this.request<ApiDecoupageAdministratifResponse[], Localisation[]>(endpoint, mapLocalisationList, contexte);
	}

	async getDépartementListByNuméroDépartement(numéroDépartementRecherche: string): Promise<Either<Localisation[]>> {
		const endpoint = `departements?code=${numéroDépartementRecherche.toUpperCase()}`;
		const contexte = 'départements';
		return this.request<ApiDecoupageAdministratifResponse[], Localisation[]>(endpoint, mapLocalisationList, contexte);
	}

	async getRégionListByNom(regionRecherchee: string): Promise<Either<Localisation[]>> {
		const regionRechercheeWithoutParenthesis = removeParenthesis(regionRecherchee);
		const endpoint = `regions?nom=${regionRechercheeWithoutParenthesis}`;
		const contexte = 'régions';
		return this.request<ApiDecoupageAdministratifResponse[], Localisation[]>(endpoint, mapLocalisationList, contexte);
	}

	async getCodeRegionByLongitudeLatitude(longitude: number, latitude: number): Promise<Either<string | undefined>> {
		const endpoint = `communes?lon=${longitude}&lat=${latitude}`;
		const contexte = 'communes';
		return this.request<ApiDecoupageAdministratifResponse[], string>(endpoint, getCodeRegion, contexte);
	}

	private async request<Data, Response>(endpoint: string, mapper: (data : Data) => Response, contexte: string): Promise<Either<Response>> {
		try {
			const { data } = await this.httpClientService.get<Data>(endpoint);
			const result = mapper(data);
			return createSuccess(result);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Geo', contexte: `get ${contexte}`, message: `impossible de récupérer une ressource de type ${contexte}`,
			});
		}
	}
}
