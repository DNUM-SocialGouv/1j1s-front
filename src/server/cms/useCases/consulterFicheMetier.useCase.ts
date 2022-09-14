import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { Either } from '~/server/errors/either';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';

export class ConsulterFicheMetierUseCase {
  constructor(private cmsRepository: CmsRepository) {}
	
  async handle(nom: string): Promise<Either<FicheMétier>> {
    return this.cmsRepository.getFicheMetierByNom(nom);
  }
}
