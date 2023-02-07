import { HttpClientService } from '../httpClient.service'
import { Either } from '../../../server/errors/either'

export class AlternanceService {
	constructor(private httpClientService: HttpClientService) {}


	async rechercherMétier(query:string): Promise<Either<Array<string>>> {
		return this.httpClientService.get<Array<string>>(`alternances/metiers?${query}`)
	}

	async rechercherAlternance(query:string): Promise<Either<any>> {
		return this.httpClientService.get<any>(`alternances?${query}`)
	}
}