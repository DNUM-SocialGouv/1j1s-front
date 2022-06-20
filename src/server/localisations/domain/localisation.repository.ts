import { Adresse } from '~/server/localisations/domain/adresse';
import { CodeInsee } from '~/server/localisations/domain/codeInsee';
import { Localisation } from '~/server/localisations/domain/localisation';

export interface LocalisationRepository {
  getCommuneListByNom(communeRecherchée: string): Promise<Localisation[]>;
  getDépartementListByNom(départementRecherché: string): Promise<Localisation[]>;
  getDépartementListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Localisation[]>;
  getCommuneListByCodePostal(codePostalRecherchée: string): Promise<Localisation[]>;
  getCommuneListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Localisation[]>;
  getRégionListByNom(régionRecherchée: string): Promise<Localisation[]>;
  getAdresseList(adresseRecherchée: string): Promise<Adresse[]>;
  getLocalisationByTypeLocalisationAndCodeInsee(typeLocalisation: string, codeInsee: CodeInsee): Promise<Localisation | undefined>;
}
