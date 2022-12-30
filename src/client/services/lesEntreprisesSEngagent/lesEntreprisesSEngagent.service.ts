import { HttpClientService } from '~/client/services/httpClient.service';
import { FormulaireEngagement } from '~/pages/les-entreprises-s-engagent/inscription/index.page';
import { Either } from '~/server/errors/either';

export class LesEntreprisesSEngagentService {
	constructor(private httpClientService: HttpClientService) {
	}

	async envoyerFormulaireEngagement(formulaire: FormulaireEngagement): Promise<Either<void>> {
		return this.httpClientService.post('entreprises', formulaire);
	}
}
