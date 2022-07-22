import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErrorType } from '~/server/errors/error.types';
import { RechercheLocalisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import {
  LocalisationAvecCoordonnéesRepository,
} from '~/server/localisations/domain/localisationAvecCoordonnées.repository';

export class RechercherLocalisationUseCase {
  constructor(private localisationRepository: LocalisationRepository, 
              private localisationAvecCoordonnéesRepository: LocalisationAvecCoordonnéesRepository) {}

  private DEPARTEMENT_LENGTH = 2;
  private CODE_POSTAL_LENGTH = 5;

  async handle(recherche: string): Promise<Either<RechercheLocalisation>> {
    if (this.isRechercheByNumeroDepartement(recherche)) {
      return await this.getLocalisationByNumeroDepartement(recherche);
    } else if (this.isRechercheByNumeroCodePostal(recherche)) {
      return await this.getLocalisationByNumeroCodePostal(recherche);
    } else {
      return await this.getLocalisationByNom(recherche);
    }
  }

  private isRechercheByNumeroCodePostal(recherche: string): boolean {
    return this.checkRechercheOnlyNumber(this.CODE_POSTAL_LENGTH, recherche);
  }

  private isRechercheByNumeroDepartement(recherche: string): boolean {
    return this.checkRechercheOnlyNumber(this.DEPARTEMENT_LENGTH, recherche);
  }

  private checkRechercheOnlyNumber(length: number, recherche: string): boolean {
    return new RegExp(/^\d*$/).test(recherche) && recherche.length === length;
  }

  private async getLocalisationByNumeroDepartement(recherche: string): Promise<Either<RechercheLocalisation>> {
    try {
      return createSuccess({
        communeList: [],
        départementList: await this.localisationRepository.getDépartementListByNuméroDépartement(recherche),
        régionList: [],
      });
    } catch {
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }
  }

  private async getLocalisationByNumeroCodePostal(recherche: string): Promise<Either<RechercheLocalisation>> {
    const communeList = await this.localisationAvecCoordonnéesRepository.getCommuneList(recherche);

    if (communeList.instance === 'success') {
      return createSuccess({
        communeList: communeList.result.résultats,
        départementList: [],
        régionList: [],
      });
    }

    return createFailure(communeList.errorType);
  }

  private async getLocalisationByNom(recherche: string): Promise<Either<RechercheLocalisation>> {
    try {
      const [communeList, départementList, régionList] = await Promise.all([
        this.localisationAvecCoordonnéesRepository.getCommuneList(recherche),
        this.localisationRepository.getDépartementListByNom(recherche),
        this.localisationRepository.getRégionListByNom(recherche),
      ]);

      if (communeList.instance === 'success') {
        return createSuccess({
          communeList: communeList.result.résultats,
          départementList,
          régionList,
        });
      }
      return createFailure(communeList.errorType);
    } catch {
      return createFailure(ErrorType.ERREUR_INATTENDUE);
    }

  }
}
