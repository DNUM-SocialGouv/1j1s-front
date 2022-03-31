import { OffreEmploi } from "./OffreEmploi";

export interface OffreEmploiRepository {
  listeOffreEmploi(): Promise<OffreEmploi[]>;
}
