import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { DemandeDeContactEntreprise } from '~/server/demande-de-contact/domain/demandeDeContact';
import { DemandeDeContactRepository } from '~/server/demande-de-contact/domain/demandeDeContact.repository';
import { Either } from '~/server/errors/either';

export class DemandeDeContactEntrepriseRepository implements DemandeDeContactRepository {
  constructor(private cmsRepository: CmsRepository) {
  }

  async envoyer(demandeDeContactEntreprise: DemandeDeContactEntreprise): Promise<Either<void>> {
    return this.cmsRepository.save('contact-entreprises', {
      email: demandeDeContactEntreprise.email,
      message: demandeDeContactEntreprise.message,
      nom: demandeDeContactEntreprise.nom,
      prenom: demandeDeContactEntreprise.prénom,
      sujet: demandeDeContactEntreprise.sujet,
      telephone: demandeDeContactEntreprise.téléphone,
    });
  }
}
