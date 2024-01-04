import { HttpClientService } from '~/client/services/httpClient.service';
import { Either } from '~/server/errors/either';
import { DemandeDeContact } from '~/server/demande-de-contact/domain/demandeDeContact';
import { DemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service';

export interface FormulaireDemandeDeContactCEJ {
  age: number
  email: string
  nom: string
  prénom: string
  téléphone: string
  ville: string
  codePostal: string
}

export class BffDemandeDeContactService implements DemandeDeContactService {

	constructor(private readonly httpClientService: HttpClientService) {
	}

	async envoyerPourLeCEJ(formulaire: FormulaireDemandeDeContactCEJ): Promise<Either<undefined>> {
		return this.httpClientService.post('demandes-de-contact', { ...formulaire, type: 'CEJ' });
	};
}
