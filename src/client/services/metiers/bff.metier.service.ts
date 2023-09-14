import { HttpClientService } from '~/client/services/httpClient.service';
import { MetierService } from '~/client/services/metiers/metier.service';
import { Either } from '~/server/errors/either';
import { Metier } from '~/server/metiers/domain/metier';

export class BffMetierService implements MetierService{
	constructor(private httpClientService: HttpClientService) {}

	async rechercherMetier(query: string): Promise<Either<Metier[]>> {
		return this.httpClientService.get<Metier[]>(`metiers?motCle=${query}`);
	}
}
