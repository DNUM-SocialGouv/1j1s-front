import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { Metier } from '~/server/metiers/domain/metier';

export class MetierService {
	// FIXME (SULI 30-08-2023): quand implementera une interface, pas oublier de modifier le ComboboxMetiers.stories.tsx
	constructor(private httpClientService: HttpClientService) {}

	async rechercherMetier(query: string): Promise<Either<Metier[]>> {
		return this.httpClientService.get<Metier[]>(`metiers?motCle=${query}`);
	}
}
