import {
	parse,
	ParsedUrlQuery,
	stringify,
} from 'querystring';

import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { RésultatRechercheFormation } from '~/server/formations/domain/formation';

interface FormationQueryFiltre extends ParsedUrlQuery {
	codeCommune: string
	codeRomes: string
	distanceCommune: string
	latitudeCommune: string
	longitudeCommune: string
}

export class FormationService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherFormation(query: string): Promise<Either<Array<RésultatRechercheFormation>>> {
		const filtres = this.filtrerQueries(query);
		return this.httpClientService.get<Array<RésultatRechercheFormation>>(`formations?${filtres}`);
	}

	private filtrerQueries(query: string): string {
		const currentQueries = parse(query);
		const queries: FormationQueryFiltre = {
			codeCommune: currentQueries.codeCommune,
			codeRomes: currentQueries.codeRomes,
			distanceCommune: currentQueries.distanceCommune,
			latitudeCommune: currentQueries.latitudeCommune,
			longitudeCommune: currentQueries.longitudeCommune,
		} as FormationQueryFiltre;
		return stringify(queries);
	}
}
