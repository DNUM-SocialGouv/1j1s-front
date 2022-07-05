import { Localisation } from '~/server/localisations/domain/localisation';

export interface LocalisationRepository {
  getCommuneListByNom(communeRecherchée: string): Promise<Localisation[]>;
  getCommuneListByCodePostal(codePostalRecherchée: string): Promise<Localisation[]>;
  getCommuneListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Localisation[]>;
  getDépartementListByNom(départementRecherché: string): Promise<Localisation[]>;
  getDépartementListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Localisation[]>;
  getRégionListByNom(régionRecherchée: string): Promise<Localisation[]>;
  getLocalisationByTypeLocalisationAndCodeInsee(typeLocalisation: string, codeInsee: string): Promise<Localisation | undefined>;
}
