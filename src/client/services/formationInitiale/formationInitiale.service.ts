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
	domaine?: string
}


export class FormationInitialeService implements FormationInitialeInterface {
	constructor(private readonly httpClient: HttpClientService) {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async rechercherFormationInitiale(query: FormationInitialeQueryParams): Promise<Either<Array<FormationInitiale>>> {
		const filteredQuery = this.filtreQuery(query);
		const sanitizedQuery = removeUndefinedKeys(filteredQuery);
		const queryString = stringify(sanitizedQuery);
		return await this.httpClient.get<Array<FormationInitiale>>(`formations-initiales?${queryString}`);
	}

	private filtreQuery(query: FormationInitialeQueryParams): FormationInitialeQueryFiltre {
		return {
			domaine: query.domaine,
		};
	}
}
