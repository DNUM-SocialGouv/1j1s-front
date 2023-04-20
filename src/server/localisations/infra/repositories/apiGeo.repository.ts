import { createSuccess, Either } from '~/server/errors/either';
import { Localisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import { handleGetFailureError } from '~/server/localisations/infra/repositories/apiGeo.error';
import {
	mapCodeRégion,
	mapLocalisationList,
} from '~/server/localisations/infra/repositories/apiGeo.mapper';
import {
	ApiDecoupageAdministratifResponse,
} from '~/server/localisations/infra/repositories/apiGeo.response';
import { CachedHttpClientService } from '~/server/services/http/cachedHttpClient.service';
import { LoggerService } from '~/server/services/logger.service';

export class ApiGeoRepository implements LocalisationRepository {
	constructor(private readonly httpClientService: CachedHttpClientService, private readonly loggerService: LoggerService) {
	}

	async getCommuneListByNom(communeRecherchée: string): Promise<Either<Localisation[]>> {
		const endpoint = `communes?nom=${communeRecherchée}`;
		return this.request<ApiDecoupageAdministratifResponse[], Localisation[]>(endpoint, mapLocalisationList);
	}

	async getCommuneListByCodePostal(codePostalRecherché: string): Promise<Either<Localisation[]>> {
		const endpoint = `communes?codePostal=${codePostalRecherché}`;
		return this.request<ApiDecoupageAdministratifResponse[], Localisation[]>(endpoint, mapLocalisationList);
	}

	async getCommuneListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Either<Localisation[]>> {
		const endpoint = `departements/${numéroDépartementRecherché}/communes`;
		return this.request<ApiDecoupageAdministratifResponse[], Localisation[]>(endpoint, mapLocalisationList);
	}

	async getDépartementListByNom(départementRecherché: string): Promise<Either<Localisation[]>> {
		const endpoint = `departements?nom=${départementRecherché}`;
		return this.request<ApiDecoupageAdministratifResponse[], Localisation[]>(endpoint, mapLocalisationList);
	}

	async getDépartementListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Either<Localisation[]>> {
		const endpoint = `departements?code=${numéroDépartementRecherché}`;
		return this.request<ApiDecoupageAdministratifResponse[], Localisation[]>(endpoint, mapLocalisationList);
	}

	async getRégionListByNom(régionRecherchée: string): Promise<Either<Localisation[]>> {
		const endpoint = `regions?nom=${régionRecherchée}`;
		return this.request<ApiDecoupageAdministratifResponse[], Localisation[]>(endpoint, mapLocalisationList);
	}

	async getCodeRegionByCodePostal(codePostalRecherché: string): Promise<Either<string | undefined>> {
		try {
			const endpoint = `communes?codePostal=${codePostalRecherché}`;
			return this.request<ApiDecoupageAdministratifResponse[], string | undefined>(endpoint, mapCodeRégion);
		} catch (e) {
			return handleGetFailureError(e, 'localisation', this.loggerService);
		}
	}

	private async request<Data, Response>(endpoint: string, mapper: (data : Data) => Response): Promise<Either<Response>> {
		try {
			const { data } = await this.httpClientService.get<Data>(endpoint);
			return createSuccess(mapper(data));
		} catch (e) {
			return handleGetFailureError(e, 'localisation', this.loggerService);
		}
	}
}
