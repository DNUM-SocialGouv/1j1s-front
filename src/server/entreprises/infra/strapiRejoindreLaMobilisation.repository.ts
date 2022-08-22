import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

import { Entreprise } from '../domain/Entreprise';
import { RejoindreLaMobilisationRepository } from '../domain/RejoindreLaMobilisation.repository';

export class StrapiRejoindreLaMobilisationRepository implements RejoindreLaMobilisationRepository {

  constructor(private strapiHttpClientService: StrapiHttpClientService) {
  }
  async save(entreprise: Entreprise): Promise<Either<void>> {
    try {
      await this.strapiHttpClientService.post('entreprises', {
        data: {
          code_postal: entreprise.codePostal,
          email: entreprise.email,
          nom: entreprise.nom,
          nom_societe: entreprise.nomSociété,
          prenom: entreprise.prénom,
          secteur: entreprise.secteur,
          siret: entreprise.siret,
          taille: entreprise.taille,
          telephone: entreprise.téléphone,
          travail: entreprise.travail,
        },
      });
    } catch (error) {
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
    return createSuccess(undefined);
  }
}
