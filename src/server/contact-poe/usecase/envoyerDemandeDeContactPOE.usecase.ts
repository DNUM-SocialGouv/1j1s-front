import Joi from 'joi';
import phone from 'phone';

import { DemandeDeContactPOE } from '~/server/contact-poe/domain/DemandeDeContactPOE';
import { DemandeDeContactPOERepository } from '~/server/contact-poe/domain/DemandeDeContactPOERepository';
import { SecteurDActivité, TailleDEntreprise } from '~/server/entreprises/domain/Entreprise';
import { createFailure, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

export interface EnvoyerDemandeDeContactPOE {
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
  nbRecrutment: string;
  commentaire: string;
}

export class EnvoyerDemandeDeContactPOEUsecase {
  constructor(private demandeDeContactPOERepository: DemandeDeContactPOERepository) {
  }

  async handle(command: EnvoyerDemandeDeContactPOE): Promise<Either<void>> {
    try {
      const contactPOE: DemandeDeContactPOE = Joi.attempt(command, DemandeDeContactPOEValidator);
      return this.demandeDeContactPOERepository.savePOE(contactPOE);
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

function validatePhone(input: string): string {
  const { isValid, phoneNumber } = phone(input, { country: 'FR', validateMobilePrefix: false });
  if (!isValid) {
    throw Error('Le numéro de téléphone n\'est pas un numéro français valide');
  }
  return phoneNumber;
}
