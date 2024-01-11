import { Metier } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/Metier';
import { HttpClientService } from '~/client/services/httpClient.service';
import { MetierService } from '~/client/services/metiers/metier.service';
import { createSuccess, Either, isFailure } from '~/server/errors/either';
import { MetierStage3emeEt2nd } from '~/server/stage-3eme-et-2nd/domain/metierStage3emeEt2nd';

export class BffStage3emeEt2ndMetierService implements MetierService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherMetier(query: string): Promise<Either<Metier[]>> {
		const metiersStage3emeEt2nd = await this.httpClientService.get<MetierStage3emeEt2nd[]>(`stages-3eme-et-2nd/metiers?motCle=${query}`);
		if (isFailure(metiersStage3emeEt2nd)) {
			return metiersStage3emeEt2nd;
		}
		const metiers = this.mapToMetier(metiersStage3emeEt2nd.result);
		return createSuccess(metiers);
	}

	private mapToMetier(metiersStage3emeEt2nd: MetierStage3emeEt2nd[]) {
		return metiersStage3emeEt2nd.map((metierStage3emeEt2nd) => ({
			code: metierStage3emeEt2nd.code,
			label: metierStage3emeEt2nd.label,
		}));
	}
}
