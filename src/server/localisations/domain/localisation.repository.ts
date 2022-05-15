import { Adresse } from '~/server/localisations/domain/adresse';
import { Localisation } from '~/server/localisations/domain/localisation';

export interface LocalisationRepository {
  getCommuneListByNom(communeRecherchée: string): Promise<Localisation[]>;
  getDépartementListByNom(départementRecherché: string): Promise<Localisation[]>;
  getDépartementListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Localisation[]>;
  getCommuneListByCodePostal(codePostalRecherchée: string): Promise<Localisation[]>;
  getCommuneListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Localisation[]>;
  getRégionListByNom(régionRecherchée: string): Promise<Localisation[]>;
  getAdresseList(adresseRecherchée: string): Promise<Adresse[]>;
  getLocalisationByCode(typeLocalisation: string, codeInsee: string): Promise<Localisation>;
}
