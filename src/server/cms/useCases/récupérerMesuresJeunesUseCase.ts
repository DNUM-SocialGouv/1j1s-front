import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { MesuresJeunes } from '~/server/cms/domain/mesuresJeunes';
import { Either } from '~/server/errors/either';

export class RécupérerMesuresJeunesUseCase {
  constructor(private cmsRepository: CmsRepository) {}

  async handle(): Promise<Either<MesuresJeunes>> {
    return this.cmsRepository.getMesuresJeunes();
  }
}
