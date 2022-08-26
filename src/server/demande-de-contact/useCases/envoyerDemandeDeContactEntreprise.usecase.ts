import Joi from 'joi';
import phone from 'phone';

import { createFailure, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

import { DemandeDeContactEntreprise } from '../domain/DemandeDeContact';
import { DemandeDeContactRepository } from '../domain/DemandeDeContact.repository';

type EnvoyerDemanderDeContactEntreprise = Partial<{
    prénom: string
    nom: string
    email: string
    téléphone: string
    sujet: string
    message: string
}>

export class EnvoyerDemanderDeContactEntrepriseUseCase {
  constructor(private demandeDeContactRepository: DemandeDeContactRepository) {}

  async handle(command: EnvoyerDemanderDeContactEntreprise): Promise<Either<void>> {
    try {
      const demandeDeContactEntreprise: DemandeDeContactEntreprise = Joi.attempt(command, DemandeDeContactEntrepriseValidator);
      return this.demandeDeContactRepository.saveEntreprise(demandeDeContactEntreprise);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
  }
}

const DemandeDeContactEntrepriseValidator = Joi.object({
  email: Joi.string().email().required(),
  message: Joi.string().required(),
  nom: Joi.string().required(),
  prénom: Joi.string().required(),
  sujet: Joi.string().required(),
  téléphone: Joi.string().custom(validatePhone).required(),
});

function validatePhone (input: string): string {
  const { isValid, phoneNumber } = phone(input, { country: 'FR', validateMobilePrefix: false  });
  if (!isValid) {
    throw Error('Le numéro de téléphone n\'est pas un numéro français valide');
  }
  return phoneNumber;
}
