import { ParsedUrlQuery, stringify } from 'querystring';

import { FormationInitialeQueryParams } from '~/client/hooks/useFormationInitialeQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';
import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';

export interface FormationInitialeInterface {
	rechercherFormationInitiale(query: FormationInitialeQueryParams): Promise<Either<Array<FormationInitiale>>>
}

interface FormationInitialeQueryFiltre extends ParsedUrlQuery {
	motCle?: string
}


export class FormationInitialeService implements FormationInitialeInterface {
	constructor(private readonly httpClient: HttpClientService) {}

	async rechercherFormationInitiale(query: FormationInitialeQueryParams): Promise<Either<Array<FormationInitiale>>> {
		const filteredQuery = this.filtreQuery(query);
		const sanitizedQuery = removeUndefinedKeys(filteredQuery);
		const queryString = filteredQuery.motCle === '' ? '' : stringify(sanitizedQuery);
		return await this.httpClient.get<Array<FormationInitiale>>(`formations-initiales?${queryString}`);
	}

	private filtreQuery(query: FormationInitialeQueryParams): FormationInitialeQueryFiltre {
		return {
			motCle: query.motCle,
		};
	}
}
