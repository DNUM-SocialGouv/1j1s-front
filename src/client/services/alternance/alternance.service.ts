import { HttpClientService } from '~/client/services/httpClient.service';
import { Alternance } from '~/server/alternances/domain/alternance';
import { MetierAlternance } from '~/server/alternances/domain/métier';
import { Either } from '~/server/errors/either';

export class AlternanceService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherMétier(query: string): Promise<Either<MetierAlternance[]>> {
		return this.httpClientService.get<MetierAlternance[]>(`alternances/metiers?motCle=${query}`);
	}

	async rechercherAlternance(query:string): Promise<Either<Array<Alternance>>> {
		return this.httpClientService.get<Array<Alternance>>(`alternances?${query}`);
	}
}
