import { Either } from '../../errors/either';
import { CarteActualite } from '../domain/actualite';
import { CmsRepository } from '../domain/cms.repository';

export class RéCupererActualitesUseCase {
  constructor(private cmsRepository: CmsRepository) {}

  async handle(): Promise<Either<CarteActualite[]>> {
    return this.cmsRepository.getActualites();
  }
}
