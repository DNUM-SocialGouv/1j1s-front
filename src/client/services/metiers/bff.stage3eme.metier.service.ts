import { MetierOption } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/MetierOption';
import { HttpClientService } from '~/client/services/httpClient.service';
import { MetierService } from '~/client/services/metiers/metier.service';
import { createSuccess, Either, isFailure } from '~/server/errors/either';
import { MetierStage3eme } from '~/server/stage-3eme/domain/metierStage3eme';

export class BffStage3emeMetierService implements MetierService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherMetier(query: string): Promise<Either<MetierOption[]>> {
		const metiers = await this.httpClientService.get<MetierStage3eme[]>(`stages-3eme/metiers?motCle=${query}`);
		if (isFailure(metiers)) {
			return metiers;
		}
		return createSuccess(metiers.result.map((metier) => ({
			code: metier.code,
			label: metier.label,
		})));
	}
}
