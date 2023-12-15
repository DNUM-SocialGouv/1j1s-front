import { MetierCodeRome } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/MetierCode';
import { HttpClientService } from '~/client/services/httpClient.service';
import { MetierService } from '~/client/services/metiers/metier.service';
import { createSuccess, Either } from '~/server/errors/either';
import { Metier, MetierLba } from '~/server/metiers/domain/metier';

export class BffLbaMetierService implements MetierService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherMetier(query: string): Promise<Either<Metier[]>> {
		const metierResult = await this.httpClientService.get<MetierLba[]>(`metiers?motCle=${query}`);
		if (metierResult.instance === 'success') {
			return createSuccess(
				metierResult.result.map((metier) => {
					return {
						code: metier.code.map((code) => new MetierCodeRome(code.code)),
						label: metier.label,
					};
				}),
			);
		}
		return metierResult;
	}
}
