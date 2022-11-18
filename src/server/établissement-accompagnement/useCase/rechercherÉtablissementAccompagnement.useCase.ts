import { Either } from '~/server/errors/either';
import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';
import { ApiÉtablissementPublicRepository } from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.repository';

export class RechercherÉtablissementAccompagnementUseCase {
  constructor(private apiÉtablissementPublicRepository: ApiÉtablissementPublicRepository) {
  }

  async handle(commune: string): Promise<Either<ÉtablissementAccompagnement[]>> {
    return this.apiÉtablissementPublicRepository.search(commune);
  }
}
