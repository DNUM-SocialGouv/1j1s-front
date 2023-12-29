import { Metier } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/Metier';
import { HttpClientService } from '~/client/services/httpClient.service';
import { MetierService } from '~/client/services/metiers/metier.service';
import { createSuccess, Either, isFailure } from '~/server/errors/either';
import { MetierStage3eme } from '~/server/stage-3eme/domain/metierStage3eme';

export class BffStage3emeMetierService implements MetierService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherMetier(query: string): Promise<Either<Metier[]>> {
		const metiersStage3eme = await this.httpClientService.get<MetierStage3eme[]>(`stages-3eme/metiers?motCle=${query}`);
		if (isFailure(metiersStage3eme)) {
			return metiersStage3eme;
		}
		const metiers = this.mapToMetier(metiersStage3eme.result);
		return createSuccess(metiers);
	}

	private mapToMetier(metiersStage3eme: MetierStage3eme[]) {
		return metiersStage3eme.map((metierStage3eme) => ({
			code: metierStage3eme.code,
			label: metierStage3eme.label,
		}));
	}
}
