import {
  AlternanceFiltre,
  AlternanceId,
  From,
  RésultatsRechercheAlternance,
} from '~/server/alternances/domain/alternance';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';
import {
  ConsulterOffreAlternance,
} from '~/server/alternances/infra/repositories/alternance.type';
import { Either } from '~/server/errors/either';

export interface AlternanceRepository {
  getMétierRecherchéList(metierRechercher: string): Promise<MétierRecherché[]>;
  searchAlternance(alternanceFiltre: AlternanceFiltre): Promise<RésultatsRechercheAlternance>;
  getOffreAlternance(id: AlternanceId, from: From): Promise<Either<ConsulterOffreAlternance>>
}

