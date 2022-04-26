import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';

export interface AlternanceRepository {
  getMétierRecherchéList(metierRechercher: string): Promise<MétierRecherché[]>;
}
