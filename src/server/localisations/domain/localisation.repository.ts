import { Adresse } from "./adresse";
import { Localisation } from "./localisation";

export interface LocalisationRepository {
  listeCommune(communeRecherche: string): Promise<Localisation[]>;
  listeDepartement(departementRecherche: string): Promise<Localisation[]>;
  listeRegion(regionRecherche: string): Promise<Localisation[]>;
  listeAdresse(adresseRecherche: string): Promise<Adresse[]>;
}
