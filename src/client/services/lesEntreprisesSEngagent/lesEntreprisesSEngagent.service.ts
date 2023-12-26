import { HttpClientService } from '~/client/services/httpClient.service';
import { EntrepriseSouhaitantSEngager } from '~/server/entreprises/domain/EntrepriseSouhaitantSEngager';
import { Either } from '~/server/errors/either';

export class LesEntreprisesSEngagentService {
	constructor(private httpClientService: HttpClientService) {
	}

	async envoyerFormulaireEngagement(formulaire: EntrepriseSouhaitantSEngager): Promise<Either<void>> {
		return this.httpClientService.post('entreprises', formulaire);
	}
}
