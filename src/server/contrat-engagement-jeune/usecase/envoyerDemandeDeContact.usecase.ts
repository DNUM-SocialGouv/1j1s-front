import Joi from 'joi';
import phone from 'phone';

import { createFailure, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

import { Age,DemandeDeContact } from '../domain/DemandeDeContact';
import { DemandeDeContactRepository } from '../domain/DemandeDeContact.repository';


type EnvoyerDemanderDeContact = Partial<{
    prénom: string
    nom: string
    email: string
    téléphone: string
    ville: string
    age: number
}>

export class EnvoyerDemanderDeContactUseCase {
  constructor(private demandeDeContactRepository: DemandeDeContactRepository) {}

  async handle(command: EnvoyerDemanderDeContact): Promise<Either<void>> {
    try {
      const demandeDeContact: DemandeDeContact = Joi.attempt(command, DemandeDeContactValidator);
      return this.demandeDeContactRepository.save(demandeDeContact);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
  }
}

const DemandeDeContactValidator = Joi.object({
  age: Joi.number().allow(16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30).custom(Age),
  email: Joi.string().email(),
  nom: Joi.string(),
  prénom: Joi.string(),
  téléphone: Joi.string().custom(validatePhone),
  ville: Joi.string(),
});

function validatePhone (input: string): string {
  const { isValid, phoneNumber } = phone(input, { country: 'FR' });
  if (!isValid) {
    throw Error('Le numéro de téléphone n\'est pas un numéro français valide');
  }
  return phoneNumber;
}
