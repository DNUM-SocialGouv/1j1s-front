import { MetierOption } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/MetierOption';
import { HttpClientService } from '~/client/services/httpClient.service';
import { MetierService } from '~/client/services/metiers/metier.service';
import { createSuccess, Either, isSuccess } from '~/server/errors/either';
import { MetierAlternance } from '~/server/metiers/domain/metier';

export class BffLbaMetierService implements MetierService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherMetier(query: string): Promise<Either<MetierOption[]>> {
		const metierResult = await this.httpClientService.get<MetierAlternance[]>(`metiers?motCle=${query}`);
		if (isSuccess(metierResult)) {
			return createSuccess(
				metierResult.result.map((metier) => {
					return {
						code: metier.codeRomes.toString(),
						label: metier.label,
					};
				}),
			);
		}
		return metierResult;
	}
}
