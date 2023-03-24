import { queries } from '@testing-library/react';
import { router } from 'next/client';
import {
	parse,
	ParsedUrlQuery,
	stringify,
} from 'querystring';

import { FormationQueryParams } from '~/client/hooks/useFormationQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { RésultatRechercheFormation } from '~/server/formations/domain/formation';
import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';

export class FormationService {
	constructor(private httpClientService: HttpClientService) {}

	async rechercherFormation(query: FormationQueryParams): Promise<Either<Array<RésultatRechercheFormation>>> {
		const filtres = this.filtreNiveauÉtude(query);
		const sanitizedQuery = removeUndefinedKeys(filtres);
		const queryString = stringify(sanitizedQuery);
		return this.httpClientService.get<Array<RésultatRechercheFormation>>(`formations?${queryString}`);
	}

	private filtreNiveauÉtude(query: FormationQueryParams): FormationQueryParams {
		return {
			...query,
			niveauEtudes: query.niveauEtudes !== 'indifférent' ? query.niveauEtudes : undefined,
		};
	}
}
