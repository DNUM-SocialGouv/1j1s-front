import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { Métier } from '~/server/metiers/domain/métier';

export class MétierService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherMétier(query: string): Promise<Either<Métier[]>> {
		return this.httpClientService.get<Métier[]>(`metiers?motCle=${query}`);
	}
}
