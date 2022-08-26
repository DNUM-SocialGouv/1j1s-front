import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

import { HttpClientService } from './httpClient.service';

export interface FormulaireDemandeDeContactCEJ {
  age: number
  email: string
  nom: string
  prénom: string
  téléphone: string
  ville: string
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

  constructor(private readonly httpClientService: HttpClientService ) {}

  async envoyerPourLeCEJ(formulaire: FormulaireDemandeDeContactCEJ){
    try {
      await this.httpClientService.post('demandes-de-contact', { ...formulaire, type: 'CEJ' });
      return createSuccess(undefined);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
  };

  async envoyerPourLesEntreprisesSEngagent(formulaire: FormulaireDemandeDeContactEntreprise){
    try {
      await this.httpClientService.post('demandes-de-contact', { ...formulaire, type: 'LesEntreprisesSEngagent' });
      return createSuccess(undefined);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
  };
}
