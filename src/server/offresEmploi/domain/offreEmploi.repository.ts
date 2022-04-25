import { OffreEmploi } from "~/server/offresEmploi/domain/offreEmploi";

export interface OffreEmploiRepository {
  getOffreEmploiList(): Promise<OffreEmploi[]>;
}
