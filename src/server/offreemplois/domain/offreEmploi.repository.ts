import { OffreEmploi } from "./offreEmploi";

export interface OffreEmploiRepository {
  listeOffreEmploi(): Promise<OffreEmploi[]>;
}
