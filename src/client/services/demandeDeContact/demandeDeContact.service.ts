import { HttpClientService } from '~/client/services/httpClient.service';
import { FormulairesPoleEmploi } from '~/pages/je-recrute-afpr-poei/inscription/index.page';
import { Either } from '~/server/errors/either';

export interface FormulaireDemandeDeContactCEJ {
  age: number
  email: string
  nom: string
  prénom: string
  téléphone: string
  ville: string
  codePostal: string
}

export interface FormulaireDemandeDeContactEntreprise {
  sujet: string
  email: string
  nom: string
  prénom: string
  téléphone: string
  message: string
}

export class DemandeDeContactService {

  constructor(private readonly httpClientService: HttpClientService) {
  }

  async envoyerPourLeCEJ(formulaire: FormulaireDemandeDeContactCEJ): Promise<Either<undefined>> {
    return this.httpClientService.post('demandes-de-contact', { ...formulaire, type: 'CEJ' });
  };

  async envoyerPourLesEntreprisesSEngagent(formulaire: FormulaireDemandeDeContactEntreprise): Promise<Either<undefined>> {
    return this.httpClientService.post('demandes-de-contact', { ...formulaire, type: 'LesEntreprisesSEngagent' });
  };

  async envoyerPourLePOE(formulaire: FormulairesPoleEmploi): Promise<Either<void>> {
    return this.httpClientService.post('contacts-poe', formulaire);
  }
}
