import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { FicheMétierResult } from '~/server/fiche-metier/domain/ficheMetier';

export class FicheMetierService {
	constructor(private httpClient: HttpClientService) {}
	
	async rechercherFichesMétier(query = ''): Promise<Either<FicheMétierResult>> {
		return await this.httpClient.get<FicheMétierResult>(`fiche-metier?${query}`);
	}
}
