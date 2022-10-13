import {
  AlternanceId,
  From,
} from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import {
  ConsulterOffreAlternance,
} from '~/server/alternances/infra/repositories/alternance.type';
import { Either } from '~/server/errors/either';

export class ConsulterOffreAlternanceUseCase {
  constructor(private alternanceRepository: AlternanceRepository) {
  }

  async handle(id: AlternanceId, from: From): Promise<Either<ConsulterOffreAlternance>> {
    return await this.alternanceRepository.getOffreAlternance(id, from);
  }
}
