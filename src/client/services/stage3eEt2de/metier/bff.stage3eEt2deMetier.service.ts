import { Metier } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/Metier';
import { HttpClientService } from '~/client/services/httpClient.service';
import { MetierService } from '~/client/services/metiers/metier.service';
import { createSuccess, Either, isFailure } from '~/server/errors/either';
import { MetierStage3eEt2de } from '~/server/stage-3e-et-2de/domain/metierStage3eEt2de';

export class BffStage3eEt2deMetierService implements MetierService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherMetier(query: string): Promise<Either<Metier[]>> {
		const metiersStage3eEt2de = await this.httpClientService.get<MetierStage3eEt2de[]>(`stages-3e-et-2de/metiers?motCle=${query}`);
		if (isFailure(metiersStage3eEt2de)) {
			return metiersStage3eEt2de;
		}
		const metiers = this.mapToMetier(metiersStage3eEt2de.result);
		return createSuccess(metiers);
	}

	private mapToMetier(metiersStage3eEt2de: MetierStage3eEt2de[]) {
		return metiersStage3eEt2de.map((metierStage3eEt2de) => ({
			code: metierStage3eEt2de.code,
			label: metierStage3eEt2de.label,
		}));
	}
}
