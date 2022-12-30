import { stringify } from 'querystring';

import { AccompagnementQueryParams } from '~/client/hooks/useAccompagnementQuery';
import { HttpClientService } from '~/client/services/httpClient.service';
import { DemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact';
import { Either } from '~/server/errors/either';
import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';

export class ÉtablissementAccompagnementService {
  constructor(private httpClientService: HttpClientService) {
  }

  async rechercher(queryParams: AccompagnementQueryParams): Promise<Either<ÉtablissementAccompagnement[]>> {
    return this.httpClientService.get<ÉtablissementAccompagnement[]>(`etablissements-accompagnement?${stringify(<Record<string, string | undefined>>queryParams)}`);
  }

  async envoyerDemandeContact(demandeDeContactAccompagnement: DemandeDeContactAccompagnement): Promise<Either<void>> {
    return this.httpClientService.post('etablissements-accompagnement/contact', demandeDeContactAccompagnement);
  }
}
