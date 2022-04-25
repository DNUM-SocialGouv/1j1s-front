import { Adresse } from "~/server/localisations/domain/adresse";
import { Localisation } from "~/server/localisations/domain/localisation";

export interface LocalisationRepository {
  listeCommune(communeRecherche: string): Promise<Localisation[]>;
  listeDepartement(departementRecherche: string): Promise<Localisation[]>;
  listeRegion(regionRecherche: string): Promise<Localisation[]>;
  listeAdresse(adresseRecherche: string): Promise<Adresse[]>;
}
