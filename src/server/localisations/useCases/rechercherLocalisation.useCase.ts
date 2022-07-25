import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { RechercheLocalisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import {
  LocalisationAvecCoordonnéesRepository,
} from '~/server/localisations/domain/localisationAvecCoordonnées.repository';
import RechercheLocalisationUtils from '~/server/localisations/domain/rechercheLocalisationUtils';


export class RechercherLocalisationUseCase {
  constructor(private localisationRepository: LocalisationRepository, 
              private localisationAvecCoordonnéesRepository: LocalisationAvecCoordonnéesRepository) {}

  async handle(recherche: string): Promise<Either<RechercheLocalisation>> {
    if (RechercheLocalisationUtils.isRechercheByNumeroDepartement(recherche)) {
      return await this.getLocalisationByNumeroDepartement(recherche);
    } else if (RechercheLocalisationUtils.isRechercheByNumeroCodePostal(recherche)) {
      return await this.getLocalisationByNumeroCodePostal(recherche);
    } else {
      return await this.getLocalisationByNom(recherche);
    }
  }

  private async getLocalisationByNumeroDepartement(recherche: string): Promise<Either<RechercheLocalisation>> {
    return createSuccess({
      communeList: [],
      départementList: await this.localisationRepository.getDépartementListByNuméroDépartement(recherche),
      régionList: [],
    });
  }

  private async getLocalisationByNumeroCodePostal(recherche: string): Promise<Either<RechercheLocalisation>> {
    const responseCommuneList = await this.localisationAvecCoordonnéesRepository.getCommuneList(recherche);

    if (responseCommuneList.instance === 'success') {
      return createSuccess({
        communeList: responseCommuneList.result.résultats,
        départementList: [],
        régionList: [],
      });
    }

    return createFailure(responseCommuneList.errorType);
  }

  private async getLocalisationByNom(recherche: string): Promise<Either<RechercheLocalisation>> {
    const [responseCommuneList, responseDépartementList, responseRégionList] = await Promise.all([
      this.localisationAvecCoordonnéesRepository.getCommuneList(recherche),
      this.localisationRepository.getDépartementListByNom(recherche),
      this.localisationRepository.getRégionListByNom(recherche),
    ]);

    if (responseCommuneList.instance === 'success') {
      return createSuccess({
        communeList: responseCommuneList.result.résultats,
        départementList: responseDépartementList,
        régionList: responseRégionList,
      });
    }
    return responseCommuneList;
  }
}
