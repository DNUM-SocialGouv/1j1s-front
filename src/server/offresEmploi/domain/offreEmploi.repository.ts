import {
  OffreEmploi,
  OffreEmploiFiltre,
} from "~/server/offresEmploi/domain/offreEmploi";

export interface OffreEmploiRepository {
  getOffreEmploiList(
    offreEmploiFiltre: OffreEmploiFiltre
  ): Promise<OffreEmploi[]>;
}
