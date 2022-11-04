import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';

import { DemandeDeContactCEJ, DemandeDeContactEntreprise, DemandeDeContactPOE } from '../domain/DemandeDeContact';
import { DemandeDeContactRepository } from '../domain/DemandeDeContact.repository';

export class StrapiDemandeDeContactRepository implements DemandeDeContactRepository {

  constructor(private httpClientServiceWithAuthentification: HttpClientServiceWithAuthentification) {
  }

  async saveCEJ(demandeDeContactCEJ: DemandeDeContactCEJ): Promise<Either<void>> {
    try {
      await this.httpClientServiceWithAuthentification.post('contact-cejs', {
        data: {
          age: demandeDeContactCEJ.age,
          code_postal: demandeDeContactCEJ.codePostal,
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
      await this.httpClientServiceWithAuthentification.post('contact-entreprises', {
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

  async savePOE(demandeDeContactPOE: DemandeDeContactPOE, annotation?: string): Promise<Either<void>> {
    try {
      await this.httpClientServiceWithAuthentification.post('contacts-poe', {
        data: {
          code_postal: demandeDeContactPOE.codePostal,
          commentaire: demandeDeContactPOE.commentaire,
          email: demandeDeContactPOE.email,
          nom: demandeDeContactPOE.nom,
          nom_societe: demandeDeContactPOE.nomSociété,
          nombre_a_recruter: demandeDeContactPOE.nombreARecruter,
          prenom: demandeDeContactPOE.prénom,
          secteur: demandeDeContactPOE.secteur,
          siret: demandeDeContactPOE.siret,
          taille: demandeDeContactPOE.taille,
          telephone: demandeDeContactPOE.téléphone,
          travail: demandeDeContactPOE.travail,
          ville: demandeDeContactPOE.ville,
          ...(annotation ? { erreur: annotation } : {}),
        },
      });
    } catch (error) {
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
    return createSuccess(undefined);
  }
}
