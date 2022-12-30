import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { DemandeDeContactPOE } from '~/server/demande-de-contact/domain/demandeDeContact';
import { DemandeDeContactRepository } from '~/server/demande-de-contact/domain/demandeDeContact.repository';
import { Either } from '~/server/errors/either';

export class DemandeDeContactPOERepository implements DemandeDeContactRepository {
  constructor(private cmsRepository: CmsRepository) {
  }

  async envoyer(demandeDeContactPOE: DemandeDeContactPOE): Promise<Either<void>> {
    return this.cmsRepository.save('contacts-poe', {
      code_postal: demandeDeContactPOE.codePostal,
      commentaire: demandeDeContactPOE.commentaire,
      email: demandeDeContactPOE.email,
      nom: demandeDeContactPOE.nom,
      nom_societe: demandeDeContactPOE.nomSociété,
      nombreARecruter: demandeDeContactPOE.nombreARecruter,
      prenom: demandeDeContactPOE.prénom,
      secteur: demandeDeContactPOE.secteur,
      siret: demandeDeContactPOE.siret,
      taille: demandeDeContactPOE.taille,
      telephone: demandeDeContactPOE.téléphone,
      travail: demandeDeContactPOE.travail,
      ville: demandeDeContactPOE.ville,
    });
  }
}
