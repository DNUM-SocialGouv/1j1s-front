import { MetierOption } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/MetierOption';
import { HttpClientService } from '~/client/services/httpClient.service';
import { MetierService } from '~/client/services/metiers/metier.service';
import { createSuccess, Either, isFailure } from '~/server/errors/either';
import { MetierAlternance } from '~/server/metiers/domain/metier';

export class BffAlternanceMetierService implements MetierService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherMetier(query: string): Promise<Either<MetierOption[]>> {
		const metiersAlternanceResult = await this.httpClientService.get<MetierAlternance[]>(`metiers?motCle=${query}`);
		if (isFailure(metiersAlternanceResult)) {
			return metiersAlternanceResult;
		}
		const metiers = this.mapToMetier(metiersAlternanceResult.result);
		return createSuccess(metiers);
	}

	private mapToMetier(metiersAlternance: MetierAlternance[]) {
		return metiersAlternance.map((metierAlternance) => ({
			code: metierAlternance.codeRomes.toString(),
			label: metierAlternance.label,
		}));
	}
}
