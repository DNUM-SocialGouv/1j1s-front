import Joi from 'joi';
import phone from 'phone';

import { ContactPOE } from '~/server/contact-poe/domain/ContactPOE';
import { FormerPoleEmploiRepository } from '~/server/contact-poe/domain/FormerPoleEmploi.repository';
import { SecteurDActivité, TailleDEntreprise } from '~/server/entreprises/domain/Entreprise';
import { createFailure, createSuccess, Either, isFailure, isSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

export class JeRecruteAfprPoeiUseCase {
  constructor(
    private premierRepository: FormerPoleEmploiRepository,
    private secondRepository: FormerPoleEmploiRepository,
  ) {}
  
  async formerPoleEmploi(command: FormerPoleEmploi): Promise<Either<void>> {
    let contactpoe: ContactPOE;
    try {
      contactpoe = Joi.attempt(command, ContactPOEValidator);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
    const primarySave = await this.premierRepository.save(contactpoe);
    if (isFailure(primarySave)) {
      if (isSuccess(await this.secondRepository.save(contactpoe, primarySave.errorType))) {
        return createSuccess(undefined);
      } else {
        return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
      }
    }
    return primarySave;
  }
}

export interface FormerPoleEmploi  {
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

const ContactPOEValidator = Joi.object({
  codePostal: Joi.string().pattern(/^((?:0[1-9]|[1-8]\d|9[0-5])\d{3}|(?:97[1-6]\d{2}))$/, 'code postal français').required(), 
  commentaire: Joi.string(),
  // Regex utilsée côté LEE
  email: Joi.string().email().required(),
  nbRecrutement: Joi.string(),
  nom: Joi.string().required(),
  nomSociété: Joi.string().required(),
  prénom: Joi.string().required(),
  secteur: Joi.string().valid(...Object.keys(SecteurDActivité)).required(),
  siret: Joi.string().pattern(/^[0-9]+$/, 'numbers').length(14).required(),
  taille: Joi.string().valid(...Object.keys(TailleDEntreprise)).required(),
  travail: Joi.string().required(),
  téléphone: Joi.string().custom(validatePhone).required(),
  ville: Joi.string().required(),
});
function validatePhone (input: string): string {
  const { isValid, phoneNumber } = phone(input, { country: 'FR', validateMobilePrefix: false  });
  if (!isValid) {
    throw Error('Le numéro de téléphone n\'est pas un numéro français valide');
  }
  return phoneNumber;
}
