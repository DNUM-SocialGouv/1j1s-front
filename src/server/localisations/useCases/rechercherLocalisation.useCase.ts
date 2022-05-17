import { LocalisationList } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';

export class RechercherLocalisationUseCase {
  constructor(private localisationRepository: LocalisationRepository) {
  }

  private DEPARTEMENT_LENGTH = 2;
  private CODE_POSTAL_LENGTH = 5;

  async handle(recherche: string): Promise<LocalisationList> {
    if(RechercherLocalisationUseCase.checkRechercheOnlyNumber(this.DEPARTEMENT_LENGTH, recherche)) {
      return {
        communeList : await this.localisationRepository.getCommuneListByNuméroDépartement(recherche),
        départementList : await this.localisationRepository.getDépartementListByNuméroDépartement(recherche),
        régionList : [],
      };
    }

    if(RechercherLocalisationUseCase.checkRechercheOnlyNumber(this.CODE_POSTAL_LENGTH, recherche)) {
      return  {
        communeList : await this.localisationRepository.getCommuneListByCodePostal(recherche),
        départementList : [],
        régionList : [],
      };
    }

    const [communeList, départementList, régionList] = await Promise.all([
      this.localisationRepository.getCommuneListByNom(recherche),
      this.localisationRepository.getDépartementListByNom(recherche),
      this.localisationRepository.getRégionListByNom(recherche),
    ]);
    return {
      communeList,
      départementList,
      régionList,
    };
  }

  private static checkRechercheOnlyNumber(length: number, recherche: string) {
    return new RegExp(/^\d*$/).test(recherche) && recherche.length === length;
  }
}
