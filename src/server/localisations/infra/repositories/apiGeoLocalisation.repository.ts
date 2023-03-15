import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { Localisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import {
	ApiDecoupageAdministratifResponse,
} from '~/server/localisations/infra/repositories/apiGeoLocalisation.response';
import { mapLocalisationList } from '~/server/localisations/infra/repositories/apiLocalisation.mapper';
import { handleGetFailureError } from '~/server/localisations/infra/repositories/apiLocalisationError';
import { HttpClientServiceWithCache } from '~/server/services/http/httpClientServiceWithCache.service';

export class ApiGeoLocalisationRepository implements LocalisationRepository {
	constructor(private readonly httpClientService: HttpClientServiceWithCache) {
	}

	async getCommuneListByNom(communeRecherchée: string): Promise<Either<Localisation[]>> {
		return this.request(`communes?nom=${communeRecherchée}`);
	}

	async getCommuneListByCodePostal(codePostalRecherchée: string): Promise<Either<Localisation[]>> {
		return this.request(`communes?codePostal=${codePostalRecherchée}`);
	}

	async getCommuneListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Either<Localisation[]>> {
		return this.request(`departements/${numéroDépartementRecherché}/communes`);
	}

	async getDépartementListByNom(départementRecherché: string): Promise<Either<Localisation[]>> {
		return this.request(`departements?nom=${départementRecherché}`);
	}

	async getDépartementListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Either<Localisation[]>> {
		return this.request(`departements?code=${numéroDépartementRecherché}`);
	}

	async getRégionListByNom(régionRecherchée: string): Promise<Either<Localisation[]>> {
		return this.request(`regions?nom=${régionRecherchée}`);
	}

	private async request(endpoint: string): Promise<Either<Localisation[]>> {
		try {
			const response = await this.httpClientService.get<ApiDecoupageAdministratifResponse[]>(endpoint);
			return createSuccess(mapLocalisationList(response.data));
		} catch (e) {
			return handleGetFailureError(e, 'localisation');
		}
	}

	async getCodeRegionByCodePostal(codePostalRecherché: string): Promise<Either<string>> {
		try {
			const response = await this.httpClientService.get<ApiDecoupageAdministratifResponse[]>(`communes?codePostal=${codePostalRecherché}`);
			if (response.data.length === 0 || !response.data[0].codeRegion)
				return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
			return createSuccess(response.data[0].codeRegion);
		} catch (e) {
			return handleGetFailureError(e, 'localisation');
		}
	}
}
