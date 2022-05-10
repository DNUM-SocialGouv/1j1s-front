import { Localisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';

export class RechercherLocalisationUseCase {
  constructor(private localisationRepository: LocalisationRepository) {
  }

  async handle(recherche: string): Promise<LocalisationList> {
    if(RechercherLocalisationUseCase.checkRechercheOnlyNumber(2, recherche)) {
      return {
        communeList : await this.localisationRepository.getCommuneListByNuméroDépartement(recherche),
        départementList : await this.localisationRepository.getDépartementListByNuméroDépartement(recherche),
        régionList : [],
      };
    } else if(RechercherLocalisationUseCase.checkRechercheOnlyNumber(5, recherche)) {
      return  {
        communeList : await this.localisationRepository.getCommuneListByCodePostal(recherche),
        départementList : [],
        régionList : [],
      };
    } else {
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
  }
  private static checkRechercheOnlyNumber(length: number, recherche: string) {
    return new RegExp(/^\d*$/).test(recherche) && recherche.length == length;
  }
}

export interface LocalisationList {
  communeList: Localisation[]
  départementList: Localisation[]
  régionList: Localisation[]
} 
