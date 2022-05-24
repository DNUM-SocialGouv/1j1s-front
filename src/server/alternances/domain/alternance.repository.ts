import { AlternanceFiltre, RésultatsRechercheAlternance } from '~/server/alternances/domain/alternance';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';

export interface AlternanceRepository {
  getMétierRecherchéList(metierRechercher: string): Promise<MétierRecherché[]>;
  getAlternanceList(alternanceFiltre: AlternanceFiltre): Promise<RésultatsRechercheAlternance>;
}
