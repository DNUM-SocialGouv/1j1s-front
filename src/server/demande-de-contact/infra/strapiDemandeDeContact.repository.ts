import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { HttpClientService } from '~/server/services/http/httpClient.service';

import { DemandeDeContactCEJ, DemandeDeContactEntreprise } from '../domain/DemandeDeContact';
import { DemandeDeContactRepository } from '../domain/DemandeDeContact.repository';

export class StrapiDemandeDeContactRepository implements DemandeDeContactRepository {

  constructor(private httpClientService: HttpClientService) {
  }
  async saveCEJ(demandeDeContactCEJ: DemandeDeContactCEJ): Promise<Either<void>> {
    try {
      await this.httpClientService.post('contact-cejs', {
        data: {
          age: demandeDeContactCEJ.age,
          email: demandeDeContactCEJ.email,
          nom: demandeDeContactCEJ.nom,
          prenom: demandeDeContactCEJ.prénom,
          telephone: demandeDeContactCEJ.téléphone,
          ville: demandeDeContactCEJ.ville,
        },
      });
    } catch (error) {
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
    return createSuccess(undefined);
  }

  async saveEntreprise(demandeDeContactEntreprise: DemandeDeContactEntreprise): Promise<Either<void>> {
    try {
      await this.httpClientService.post('contact-entreprises', {
        data: {
          email: demandeDeContactEntreprise.email,
          message: demandeDeContactEntreprise.message,
          nom: demandeDeContactEntreprise.nom,
          prenom: demandeDeContactEntreprise.prénom,
          sujet: demandeDeContactEntreprise.sujet,
          telephone: demandeDeContactEntreprise.téléphone,
        },
      });
    } catch (error) {
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
    return createSuccess(undefined);
  }
}
