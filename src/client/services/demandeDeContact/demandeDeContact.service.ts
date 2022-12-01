import { FormulairesPoleEmploi } from '~/client/components/features/JeDeviensMentor/RecrutementCandidatPôleEmploi/FormulaireDeContactPOE/FormulaireDeContactPOE';
import { HttpClientService } from '~/client/services/httpClient.service';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

export interface FormulaireDemandeDeContactCEJ {
  age: number;
  email: string;
  nom: string;
  prénom: string;
  téléphone: string;
  ville: string;
  codePostal: string;
}

export interface FormulaireDemandeDeContactEntreprise {
  sujet: string;
  email: string;
  nom: string;
  prénom: string;
  téléphone: string;
  message: string;
}

export class DemandeDeContactService {

  constructor(private readonly httpClientService: HttpClientService) {
  }

  async envoyerPourLeCEJ(formulaire: FormulaireDemandeDeContactCEJ) {
    try {
      await this.httpClientService.post('demandes-de-contact', { ...formulaire, type: 'CEJ' });
      return createSuccess(undefined);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
  };

  async envoyerPourLesEntreprisesSEngagent(formulaire: FormulaireDemandeDeContactEntreprise) {
    try {
      await this.httpClientService.post('demandes-de-contact', { ...formulaire, type: 'LesEntreprisesSEngagent' });
      return createSuccess(undefined);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
  };

  async envoyerPourLePOE(formulaire: FormulairesPoleEmploi): Promise<Either<void>> {
    try {
      await this.httpClientService.post('contacts-poe', formulaire);
      return createSuccess(undefined);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
  }
}
