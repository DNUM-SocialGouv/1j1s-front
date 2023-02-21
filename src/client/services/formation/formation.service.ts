import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { Formation } from '~/server/formations/domain/formation';

export class FormationService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherFormation(query: string): Promise<Either<Array<Formation>>> {
		return this.httpClientService.get<Array<Formation>>(`formations?${query}`);
	}
}
