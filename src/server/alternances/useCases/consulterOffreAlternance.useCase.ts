import {
  AlternanceId,
  From,
} from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import { ConsulterOffreAlternanceMatcha } from '~/server/alternances/infra/repositories/alternance.type';
import { Either } from '~/server/errors/either';

export class ConsulterOffreAlternanceUseCase {
  constructor(private alternanceRepository: AlternanceRepository) {
  }

  async handle(id: AlternanceId, from: From): Promise<Either<ConsulterOffreAlternanceMatcha>> {
    return await this.alternanceRepository.getOffreAlternanceMatcha(id, from);
  }
}
