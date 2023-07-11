import { ParsedUrlQuery, stringify } from 'querystring';

import { FormationInitialeQueryParams } from '~/client/hooks/useFormationInitialeQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import {
	ResultatRechercheFormationsInitiales,
} from '~/server/formations-initiales/domain/formationInitiale';
import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';

export interface FormationInitialeInterface {
	rechercherFormationInitiale(query: FormationInitialeQueryParams): Promise<Either<ResultatRechercheFormationsInitiales>>
}

interface FormationInitialeUrlQuery extends ParsedUrlQuery {
	motCle?: string
}


export class FormationInitialeService implements FormationInitialeInterface {
	constructor(private readonly httpClient: HttpClientService) {
	}

	async rechercherFormationInitiale(query: FormationInitialeQueryParams): Promise<Either<ResultatRechercheFormationsInitiales>> {
		const formationInitialeUrlQuery = this.removeUnnecessaryParams(query);
		const sanitizedQuery = removeUndefinedKeys(formationInitialeUrlQuery);
		const queryString = stringify(sanitizedQuery);
		return await this.httpClient.get<ResultatRechercheFormationsInitiales>(`formations-initiales?${queryString}`);
	}

	private removeUnnecessaryParams(query: FormationInitialeQueryParams): FormationInitialeUrlQuery {
		return {
			motCle: query.motCle,
		};
	}
}
