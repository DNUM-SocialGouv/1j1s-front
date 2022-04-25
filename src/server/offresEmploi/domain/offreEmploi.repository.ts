import { OffreEmploi } from "~/server/offresEmploi/domain/offreEmploi";

export interface OffreEmploiRepository {
  listeOffreEmploi(): Promise<OffreEmploi[]>;
}
