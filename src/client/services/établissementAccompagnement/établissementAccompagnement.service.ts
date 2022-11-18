import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';

export class ÉtablissementAccompagnementService {
  constructor(private httpClientService: HttpClientService) {}

  async rechercher(query: string): Promise<Either<ÉtablissementAccompagnement[]>> {
    return this.httpClientService.get<ÉtablissementAccompagnement[]>(`etablissements-accompagnement?${query}`);
  }
}
