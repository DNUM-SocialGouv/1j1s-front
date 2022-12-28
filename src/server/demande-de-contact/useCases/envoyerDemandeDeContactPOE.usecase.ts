import Joi from 'joi';

import { DemandeDeContactPOE } from '~/server/demande-de-contact/domain/demandeDeContact';
import { DemandeDeContactRepository } from '~/server/demande-de-contact/domain/demandeDeContact.repository';
import { validatePhone } from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactCEJ.usecase';
import { SecteurDActivité, TailleDEntreprise } from '~/server/entreprises/domain/Entreprise';
import { createFailure, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

type EnvoyerDemandeDeContactPOE = Partial<{
  nomSociété: string;
  codePostal: string;
  ville: string;
  siret: string;
  secteur: string;
  taille: string;
  prénom: string;
  nom: string;
  email: string;
  travail: string;
  téléphone: string;
  nombreARecruter: string;
  commentaire: string;
}>

export class EnvoyerDemandeDeContactPOEUseCase {
  constructor(private demandeDeContactRepository: DemandeDeContactRepository) {
  }

  async handle(command: EnvoyerDemandeDeContactPOE): Promise<Either<void>> {
    try {
      const demandeDeContactPOE: DemandeDeContactPOE = Joi.attempt(command, DemandeDeContactPOEValidator);
      return this.demandeDeContactRepository.savePOE(demandeDeContactPOE);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
  }
}

const DemandeDeContactPOEValidator = Joi.object({
  codePostal: Joi.string().pattern(/^((?:0[1-9]|[1-8]\d|9[0-5])\d{3}|(?:97[1-6]\d{2}))$/, 'code postal français').required(),
  commentaire: Joi.string(),
  // Regex utilsée côté LEE
  email: Joi.string().email().required(),
  nom: Joi.string().required(),
  nomSociété: Joi.string().required(),
  nombreARecruter: Joi.string(),
  prénom: Joi.string().required(),
  secteur: Joi.string().valid(...Object.keys(SecteurDActivité)).required(),
  siret: Joi.string().pattern(/^[0-9]+$/, 'numbers').length(14).required(),
  taille: Joi.string().valid(...Object.keys(TailleDEntreprise)).required(),
  travail: Joi.string().required(),
  téléphone: Joi.string().custom(validatePhone).required(),
  ville: Joi.string().required(),
});
