import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { DemandeDeContactCEJ } from '~/server/demande-de-contact/domain/demandeDeContact';
import { DemandeDeContactRepository } from '~/server/demande-de-contact/domain/demandeDeContact.repository';
import { Either } from '~/server/errors/either';

export class DemandeDeContactCEJRepository implements DemandeDeContactRepository {
	constructor(private cmsRepository: CmsRepository) {
	}

	async envoyer(demandeDeContactCEJ: DemandeDeContactCEJ): Promise<Either<void>> {
		return this.cmsRepository.save('contact-cejs', {
			age: demandeDeContactCEJ.age,
			code_postal: demandeDeContactCEJ.codePostal,
			email: demandeDeContactCEJ.email,
			nom: demandeDeContactCEJ.nom,
			prenom: demandeDeContactCEJ.prénom,
			telephone: demandeDeContactCEJ.téléphone,
			ville: demandeDeContactCEJ.ville,
		});
	}
}
