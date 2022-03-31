import { MetierRecherche } from "./MetierRecherche";

export interface AlternanceRepository {
  listeMetierRecherche(metierRechercher: string): Promise<MetierRecherche[]>;
}
