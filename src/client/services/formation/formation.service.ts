import {
	ParsedUrlQuery,
	stringify,
} from 'querystring';

import { FormationQueryParams } from '~/client/hooks/useFormationQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { RésultatRechercheFormation } from '~/server/formations/domain/formation';
import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';


interface FormationQueryFiltre extends ParsedUrlQuery {
	codeCommune?: string
	codeRomes?: string
	distanceCommune?: string
	latitudeCommune?: string
	longitudeCommune?: string
	niveauEtudes?: string
}

export class FormationService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherFormation(query: FormationQueryParams): Promise<Either<Array<RésultatRechercheFormation>>> {
		const filtres = this.filtreQuery(query);
		const sanitizedQuery = removeUndefinedKeys(filtres);
		const queryString = stringify(sanitizedQuery);
		return this.httpClientService.get<Array<RésultatRechercheFormation>>(`formations?${queryString}`);
	}

	private filtreQuery(query: FormationQueryParams): FormationQueryFiltre {
		return {
			codeCommune: query.codeCommune,
			codeRomes: query.codeRomes,
			distanceCommune: query.distanceCommune,
			latitudeCommune: query.latitudeCommune,
			longitudeCommune: query.longitudeCommune,
			niveauEtudes: query.niveauEtudes !== 'indifférent' ? query.niveauEtudes : undefined,
		};
	}
}
