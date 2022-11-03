import { ContactPOE } from '~/server/contact-poe/domain/ContactPOE';
import { FormerPoleEmploiRepository } from '~/server/contact-poe/domain/FormerPoleEmploi.repository';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { HttpClientService } from '~/server/services/http/httpClient.service';

export class StrapiFormerPoleEmploiRepository implements FormerPoleEmploiRepository {
  constructor(private httpClientService: HttpClientService) { }

  async save(poe: ContactPOE, annotation?: string): Promise<Either<void>> {
    try {
      await this.httpClientService.post('contacts-poe', {
        data: {
          code_postal: poe.codePostal,
          commentaire: poe.commentaire,
          email: poe.email,
          nom: poe.nom,
          nom_societe: poe.nomSociété,
          nombreARecruter: poe.nombreARecruter,
          prenom: poe.prénom,
          secteur: poe.secteur,
          siret: poe.siret,
          taille: poe.taille,
          telephone: poe.téléphone,
          travail: poe.travail,
          ville: poe.ville,
          ...(annotation ? { erreur: annotation } : {}),
        },
      });
    } catch (error) {
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
    return createSuccess(undefined);
  }
}
