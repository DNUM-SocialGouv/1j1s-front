import {
  Alternance,
  AlternanceFiltre,
  AlternanceId,
  IdeaType,
  RésultatsRechercheAlternance,
} from '~/server/alternances/domain/alternance';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';
import { Either } from '~/server/errors/either';

export interface AlternanceRepository {
  getMétierRecherchéList(metierRechercher: string): Promise<MétierRecherché[]>;
  getAlternanceList(alternanceFiltre: AlternanceFiltre): Promise<RésultatsRechercheAlternance>;
  getOffreAlternance(id: AlternanceId, ideaType: IdeaType): Promise<Either<Alternance>>
}
