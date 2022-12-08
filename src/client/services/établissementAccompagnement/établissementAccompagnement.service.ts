import { stringify } from 'querystring';

import { AccompagnementQueryParams } from '~/client/hooks/useAccompagnementQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';
import Dict = NodeJS.Dict

export class ÉtablissementAccompagnementService {
  constructor(private httpClientService: HttpClientService) {}
  

  async rechercher(queryParams: AccompagnementQueryParams): Promise<Either<ÉtablissementAccompagnement[]>> {
    return this.httpClientService.get<ÉtablissementAccompagnement[]>(`etablissements-accompagnement?${stringify(queryParams as Dict<string>)}`);
  }
}
