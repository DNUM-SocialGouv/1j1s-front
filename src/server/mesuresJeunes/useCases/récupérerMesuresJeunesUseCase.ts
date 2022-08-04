import { Either } from '~/server/errors/either';
import { MesuresJeunes } from '~/server/mesuresJeunes/domain/mesuresJeunes';
import { MesuresJeunesRepository } from '~/server/mesuresJeunes/domain/mesuresJeunes.repository';

export class RécupérerMesuresJeunesUseCase {
  constructor(private mesuresJeunesRepository: MesuresJeunesRepository) {}

  async handle(): Promise<Either<MesuresJeunes>> {
    return this.mesuresJeunesRepository.getMesuresJeunes();
  }
}
