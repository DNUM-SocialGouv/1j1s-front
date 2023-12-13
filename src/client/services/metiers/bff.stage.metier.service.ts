import { HttpClientService } from '~/client/services/httpClient.service';
import { MetierService } from '~/client/services/metiers/metier.service';
import { createSuccess, Either, isSuccess } from '~/server/errors/either';
import { Metier } from '~/server/metiers/domain/metier';
import { MetierStage3eme } from '~/server/stage-3eme/domain/metierStage3eme';

import { MetierCodeAppellation } from '../../components/ui/Form/Combobox/ComboboxMetiers/MetierCode';

export class BffStage3emeMetierService implements MetierService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherMetier(query: string): Promise<Either<Metier[]>> {
		const metier = await this.httpClientService.get<MetierStage3eme[]>(`stages-3eme/metiers?motCle=${query}`);
		if (!isSuccess(metier)) {
			return metier;
		}
		return createSuccess(metier.result.map((metier) => ({
			code: [new MetierCodeAppellation(metier.code)],
			label: metier.libelle,
		})));
	}
}
