import { AlternanceId } from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import { ConsulterOffreAlternanceMatcha } from '~/server/alternances/infra/repositories/alternance.type';
import { Either } from '~/server/errors/either';

export class ConsulterOffreAlternanceUseCase {
  constructor(private alternanceRepository: AlternanceRepository) {
  }

  async handle(id: AlternanceId): Promise<Either<ConsulterOffreAlternanceMatcha>> {
    return await this.alternanceRepository.getOffreAlternance(id);
  }
}
