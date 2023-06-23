import { FormationInitialeQueryParams } from '~/client/hooks/useFormationInitialeQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';

export interface FormationInitialeInterface {
	rechercherFormationInitiale(query: FormationInitialeQueryParams): Promise<Either<Array<FormationInitiale>>>
}

export class FormationInitialeService implements FormationInitialeInterface {
	constructor(private readonly httpClient: HttpClientService) {}

	async rechercherFormationInitiale(query: FormationInitialeQueryParams): Promise<Either<Array<FormationInitiale>>> {
		return await this.httpClient.get<Array<FormationInitiale>>('formations-initiales' );
	}
}
