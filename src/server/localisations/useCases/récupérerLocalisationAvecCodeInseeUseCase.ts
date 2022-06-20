import { CodeInsee } from '~/server/localisations/domain/codeInsee';
import {
  Localisation,
  TypeLocalisation,
} from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';

export class RécupérerLocalisationAvecCodeInseeUseCase {
  constructor(private localisationRepository: LocalisationRepository) {
  }

  async handle(typeLocalisation: string, codeInsee: CodeInsee): Promise<Localisation | undefined> {
    const localisation = RécupérerLocalisationAvecCodeInseeUseCase.getTypeLocalisation(typeLocalisation);
    return await this.localisationRepository.getLocalisationByTypeLocalisationAndCodeInsee(localisation, codeInsee);
  }

  private static getTypeLocalisation(typeLocalisation: string) {
    switch (typeLocalisation) {
      case TypeLocalisation.DEPARTEMENT:
        return 'departements';
      case TypeLocalisation.REGION:
        return 'regions';
      default:
        return 'communes';
    }
  }
}
