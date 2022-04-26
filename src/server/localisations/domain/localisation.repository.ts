import { Adresse } from '~/server/localisations/domain/adresse';
import { Localisation } from '~/server/localisations/domain/localisation';

export interface LocalisationRepository {
  getCommuneList(communeRecherchée: string): Promise<Localisation[]>;
  getDépartementList(départementRecherché: string): Promise<Localisation[]>;
  getRégionList(régionRecherchée: string): Promise<Localisation[]>;
  getAdresseList(adresseRecherchée: string): Promise<Adresse[]>;
}
