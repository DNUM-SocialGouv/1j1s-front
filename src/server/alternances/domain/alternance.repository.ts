import { MetierRecherche } from "~/server/alternances/domain/metierRecherche";

export interface AlternanceRepository {
  getMétierRecherchéList(metierRechercher: string): Promise<MetierRecherche[]>;
}
