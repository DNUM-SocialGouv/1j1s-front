import {
	parse,
	ParsedUrlQuery,
	stringify,
} from 'querystring';

import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { Formation } from '~/server/formations/domain/formation';

interface FormationQueryFiltre extends ParsedUrlQuery {
	codeRomes: string
	codeCommune: string
	distanceCommune: string
	latitudeCommune: string
	longitudeCommune: string
}

export class FormationService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherFormation(query: string): Promise<Either<Array<Formation>>> {
		const filtres = this.filtrerQueries(query);
		return this.httpClientService.get<Array<Formation>>(`formations?${filtres}`);
	}

	filtrerQueries(query: string): string {
		const currentQueries = parse(query);
		const queries: FormationQueryFiltre = {
			codeRomes: currentQueries.codeRomes,
			codeCommune: currentQueries.codeCommune,
			distanceCommune: currentQueries.distanceCommune,
			latitudeCommune: currentQueries.latitudeCommune,
			longitudeCommune: currentQueries.longitudeCommune,
		} as FormationQueryFiltre;
		return stringify(queries);
	}
}
