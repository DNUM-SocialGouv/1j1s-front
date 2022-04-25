import { Adresse } from "~/server/localisations/domain/adresse";
import { Localisation } from "~/server/localisations/domain/localisation";

export interface LocalisationRepository {
  getCommuneList(communeRecherche: string): Promise<Localisation[]>;
  getDepartementList(departementRecherche: string): Promise<Localisation[]>;
  getRegionList(regionRecherche: string): Promise<Localisation[]>;
  getAdresseList(adresseRecherche: string): Promise<Adresse[]>;
}
