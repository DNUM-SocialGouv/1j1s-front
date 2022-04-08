import { Adresse } from "./Adresse";
import { Localisation } from "./Localisation";

export interface LocalisationRepository {
  listeCommune(communeRecherche: string): Promise<Localisation[]>;
  listeDepartement(departementRecherche: string): Promise<Localisation[]>;
  listeRegion(regionRecherche: string): Promise<Localisation[]>;
  listeAdresse(adresseRecherche: string): Promise<Adresse[]>;
}
