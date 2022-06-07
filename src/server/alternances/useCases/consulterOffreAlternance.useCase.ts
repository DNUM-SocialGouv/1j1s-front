import {
  Alternance,
  AlternanceId,
  IdeaType,
} from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';
import { Either } from '~/server/errors/either';

export class ConsulterOffreAlternanceUseCase {
  constructor(private alternanceRepository: AlternanceRepository) {
  }

  async handle(id: AlternanceId, ideaType: IdeaType): Promise<Either<Alternance>> {
    return await this.alternanceRepository.getOffreAlternance(id, ideaType);
  }
}
