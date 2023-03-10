import {
	parse,
	ParsedUrlQuery,
	stringify,
} from 'querystring';

import { HttpClientService } from '~/client/services/httpClient.service';
import { Alternance, RésultatRechercheAlternance } from '~/server/alternances/domain/alternance';
import { Either } from '~/server/errors/either';

interface AlternanceQueryFiltre extends ParsedUrlQuery {
	codeRomes: string
	codeCommune: string
	distanceCommune: string
	latitudeCommune: string
	longitudeCommune: string
}

export class AlternanceService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherAlternance(query:string): Promise<Either<Array<RésultatRechercheAlternance>>> {
		const filtres = this.filtrerQueries(query);
		return this.httpClientService.get<Array<Alternance>>(`alternances?${filtres}`);
	}

	private filtrerQueries(query: string): string {
		const currentQueries = parse(query);
		const queries: AlternanceQueryFiltre = {
			codeCommune: currentQueries.codeCommune,
			codeRomes: currentQueries.codeRomes,
			distanceCommune: currentQueries.distanceCommune,
			latitudeCommune: currentQueries.latitudeCommune,
			longitudeCommune: currentQueries.longitudeCommune,
		} as AlternanceQueryFiltre;
		return stringify(queries);
	}
}
