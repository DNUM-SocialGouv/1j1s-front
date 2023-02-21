import { HttpClientService } from '~/client/services/httpClient.service';
import { Alternance } from '~/server/alternances/domain/alternance';
import { Either } from '~/server/errors/either';

export class AlternanceService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherAlternance(query:string): Promise<Either<Array<Alternance>>> {
		return this.httpClientService.get<Array<Alternance>>(`alternances?${query}`);
	}
}
