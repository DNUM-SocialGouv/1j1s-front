import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { HttpClientService } from '~/server/services/http/httpClient.service';

import { Entreprise } from '../domain/Entreprise';
import { RejoindreLaMobilisationRepository } from '../domain/RejoindreLaMobilisation.repository';

export class StrapiRejoindreLaMobilisationRepository implements RejoindreLaMobilisationRepository {

  constructor(private httpClientService: HttpClientService) {
  }
  async save(entreprise: Entreprise, annotation?: string): Promise<Either<void>> {
    try {
      await this.httpClientService.post('entreprises', {
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
          ville: entreprise.ville,
          ...(annotation ? { erreur: annotation } : {}),
        },
      });
    } catch (error) {
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
    return createSuccess(undefined);
  }
}
