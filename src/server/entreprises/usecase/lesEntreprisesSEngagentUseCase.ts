import Joi from 'joi';
import phone from 'phone';

import { createFailure, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

import { Entreprise, SecteurDActivité, TailleDEntreprise } from '../domain/Entreprise';
import { RejoindreLaMobilisationRepository } from '../domain/RejoindreLaMobilisation.repository';

export class LesEntreprisesSEngagentUseCase {
  constructor(private rejoindreLaMobilisationRepository: RejoindreLaMobilisationRepository) {}

  async rejoindreLaMobilisation(command: RejoindreLaMobilisation): Promise<Either<void>> {
    try {
      const entreprise: Entreprise = Joi.attempt(command, EntrepriseValidator);
      return this.rejoindreLaMobilisationRepository.save(entreprise);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
  }
}

export interface RejoindreLaMobilisation  {
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
}

const EntrepriseValidator = Joi.object({
  codePostal: Joi.string().required(),
  email: Joi.string().email().required(),
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
