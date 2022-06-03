import {
  AlternanceId,
  IdeaType,
} from '~/server/alternances/domain/alternance';
import { AlternanceRepository } from '~/server/alternances/domain/alternance.repository';

export class ConsulterOffreAlternanceUseCase {
  constructor(private alternanceRepository: AlternanceRepository) {
  }

  async handle(id: AlternanceId, ideaType: IdeaType): Promise<any> { // TODO OLIV
    return await this.alternanceRepository.getOffreAlternance(id, ideaType);
  }
}
