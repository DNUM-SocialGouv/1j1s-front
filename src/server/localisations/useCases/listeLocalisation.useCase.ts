import { Localisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';

export class ListeLocalisationUseCase {
  constructor(private localisationRepository: LocalisationRepository) {
  }

  async handle(recherche: string): Promise<LocalisationList> {
    if(this.checkRechercheOnlyNumber(2, recherche)){
      return { communeList : [],
        départementList : await this.localisationRepository.getDépartementList(recherche),
        régionList : [],
      };
    }if(this.checkRechercheOnlyNumber(5, recherche)){
      return  { communeList : await this.localisationRepository.getCommuneList(recherche),
        départementList : [],
        régionList : [],
      };
    }else{
      const [communeList,départementList,régionList] = await Promise.all([this.localisationRepository.getCommuneList(recherche),
        this.localisationRepository.getDépartementList(recherche),
        this.localisationRepository.getRégionList(recherche)]);
      return { communeList, 
        départementList,
        régionList,
      };
    }
  }
  private checkRechercheOnlyNumber(length: number, recherche: string) {
    return new RegExp(/^[0-9]*$/).test(recherche) && recherche.length == length;
  }
}

interface LocalisationList {
  communeList: Localisation[]
  départementList: Localisation[]
  régionList: Localisation[]
} 
