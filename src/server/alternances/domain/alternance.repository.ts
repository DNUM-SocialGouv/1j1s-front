import { MetierRecherche } from "~/server/alternances/domain/metierRecherche";

export interface AlternanceRepository {
  listeMetierRecherche(metierRechercher: string): Promise<MetierRecherche[]>;
}
