import { Localisation } from '~/client/services/localisations/domain/localisation';
import { Either } from '~/server/errors/either';

export interface LocalisationRepository {
  getCommuneListByNom(communeRecherchée: string): Promise<Either<Localisation[]>>;
  getCommuneListByCodePostal(codePostalRecherchée: string): Promise<Either<Localisation[]>>;
  getCommuneListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Either<Localisation[]>>;
  getDépartementListByNom(départementRecherché: string): Promise<Either<Localisation[]>>;
  getDépartementListByNuméroDépartement(numéroDépartementRecherché: string): Promise<Either<Localisation[]>>;
  getRégionListByNom(régionRecherchée: string): Promise<Either<Localisation[]>>;
}
