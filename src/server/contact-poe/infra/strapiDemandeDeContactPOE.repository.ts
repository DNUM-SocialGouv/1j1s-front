import { DemandeDeContactPOE } from '~/server/contact-poe/domain/DemandeDeContactPOE';
import { DemandeDeContactPOERepository } from '~/server/contact-poe/domain/DemandeDeContactPOERepository';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export class StrapiDemandeDeContactPOERepository implements DemandeDeContactPOERepository {
  constructor(private httpClientService: HttpClientService) { }

  async savePOE(demandeDeContactPOE: DemandeDeContactPOE, annotation?: string): Promise<Either<void>> {
    try {
      await this.httpClientService.post('contacts-poe', {
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
