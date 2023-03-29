import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { FicheMétierResult } from '~/server/fiche-metier/domain/ficheMetier';

export class FicheMetierService {
	constructor(private httpClient: HttpClientService) {}

	// FIXME (GAFI 29-03-2023): Inutilisé ?
	async rechercherFichesMétier(query = ''): Promise<Either<FicheMétierResult>> {
		return this.httpClient.get<FicheMétierResult>(`fiche-metier?${query}`);
	}
}
