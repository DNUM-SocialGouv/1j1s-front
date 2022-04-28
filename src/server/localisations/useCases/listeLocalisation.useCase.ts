import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';

export class ListeLocalisationUseCase {
  constructor(private localisationRepository: LocalisationRepository) {
  }

  async handle(motRecherché: string) {
    return await this.localisationRepository.getDépartementList(motRecherché);
  }
}
