import { MetierRecherche } from "./metierRecherche";

export interface AlternanceRepository {
  listeMetierRecherche(metierRechercher: string): Promise<MetierRecherche[]>;
}
