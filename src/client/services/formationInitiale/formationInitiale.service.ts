import { ParsedUrlQuery, stringify } from 'querystring';

import { FormationInitialeQueryParams } from '~/client/hooks/useFormationInitialeQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';

export interface FormationInitialeInterface {
	rechercherFormationInitiale(query: FormationInitialeQueryParams): Promise<Either<Array<FormationInitiale>>>
}

interface FormationInitialeUrlQuery extends ParsedUrlQuery {
	motCle?: string
}


export class FormationInitialeService implements FormationInitialeInterface {
	constructor(private readonly httpClient: HttpClientService) {}

	async rechercherFormationInitiale(query: FormationInitialeQueryParams): Promise<Either<Array<FormationInitiale>>> {
		const formationInitialeUrlQuery = this.removeUnnecessaryParams(query);
		const queryString = formationInitialeUrlQuery.motCle === '' ? '' : stringify(formationInitialeUrlQuery);
		return await this.httpClient.get<Array<FormationInitiale>>(`formations-initiales?${queryString}`);
	}

	private removeUnnecessaryParams(query: FormationInitialeQueryParams): FormationInitialeUrlQuery {
		return {
			motCle: query.motCle,
		};
	}
}
