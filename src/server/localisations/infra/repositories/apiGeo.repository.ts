import { createSuccess, Either } from '~/server/errors/either';
import { Localisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import { getCodeRegion, mapLocalisationList } from '~/server/localisations/infra/repositories/apiGeo.mapper';
import { ApiDecoupageAdministratifResponse } from '~/server/localisations/infra/repositories/apiGeo.response';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { CachedHttpClientService } from '~/server/services/http/cachedHttpClient.service';

export class ApiGeoRepository implements LocalisationRepository {
	constructor(private readonly httpClientService: CachedHttpClientService, private readonly errorManagementService: ErrorManagementService) {
	}

	async getCommuneListByNom(communeRecherchée: string): Promise<Either<Localisation[]>> {
		const endpoint = `communes?nom=${communeRecherchée}`;
		const contexte = 'communes';
		return this.request<ApiDecoupageAdministratifResponse[], Localisation[]>(endpoint, mapLocalisationList, contexte);
	}

	async getCommuneListByCodePostal(codePostalRecherché: string): Promise<Either<Localisation[]>> {
		const endpoint = `communes?codePostal=${codePostalRecherché}`;
		const contexte = 'communes';
		return this.request<ApiDecoupageAdministratifResponse[], Localisation[]>(endpoint, mapLocalisationList, contexte);
	}

	async getCommuneListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Either<Localisation[]>> {
		const endpoint = `departements/${numéroDépartementRecherché}/communes`;
		const contexte = 'communes';
		return this.request<ApiDecoupageAdministratifResponse[], Localisation[]>(endpoint, mapLocalisationList, contexte);
	}

	async getDépartementListByNom(départementRecherché: string): Promise<Either<Localisation[]>> {
		const endpoint = `departements?nom=${départementRecherché}`;
		const contexte = 'départements';
		return this.request<ApiDecoupageAdministratifResponse[], Localisation[]>(endpoint, mapLocalisationList, contexte);
	}

	async getDépartementListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Either<Localisation[]>> {
		const endpoint = `departements?code=${numéroDépartementRecherché}`;
		const contexte = 'départements';
		return this.request<ApiDecoupageAdministratifResponse[], Localisation[]>(endpoint, mapLocalisationList, contexte);
	}

	async getRégionListByNom(régionRecherchée: string): Promise<Either<Localisation[]>> {
		const endpoint = `regions?nom=${régionRecherchée}`;
		const contexte = 'régions';
		return this.request<ApiDecoupageAdministratifResponse[], Localisation[]>(endpoint, mapLocalisationList, contexte);
	}

	async getCodeRegionByCodePostal(codePostalRecherché: string): Promise<Either<string | undefined>> {
		const endpoint = `communes?codePostal=${codePostalRecherché}`;
		const contexte = 'communes';
		return this.request<ApiDecoupageAdministratifResponse[], string>(endpoint, getCodeRegion, contexte);
	}

	private async request<Data, Response>(endpoint: string, mapper: (data : Data) => Response, contexte: string): Promise<Either<Response>> {
		try {
			const { data } = await this.httpClientService.get<Data>(endpoint);
			return createSuccess(mapper(data));
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'API Geo', contexte: `get ${contexte}`, message: `impossible de récupérer une ressource de type ${contexte}`,
			});
		}
	}
}
