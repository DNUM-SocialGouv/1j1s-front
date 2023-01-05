import Joi from 'joi';
import phone from 'phone';

import { DemandeDeContactCEJ,parseAge } from '~/server/demande-de-contact/domain/demandeDeContact';
import { DemandeDeContactRepository } from '~/server/demande-de-contact/domain/demandeDeContact.repository';
import { createFailure, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

export class EnvoyerDemandeDeContactCEJUseCase {
	constructor(private demandeDeContactRepository: DemandeDeContactRepository) {
	}

	async handle(command: Partial<DemandeDeContactCEJ>): Promise<Either<void>> {
		try {
			const demandeDeContactCEJ: DemandeDeContactCEJ = Joi.attempt(command, DemandeDeContactCEJValidator);
			return this.demandeDeContactRepository.envoyer(demandeDeContactCEJ);
		} catch (e) {
			return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
		}
	}
}

export const DemandeDeContactCEJValidator = Joi.object({
	age: Joi.number().allow(16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30).custom(parseAge).required(),
	codePostal: Joi.string().pattern(/^((?:0[1-9]|[1-8]\d|9[0-5])\d{3}|(?:97[1-6]\d{2}))$/, 'code postal français').required(),
	email: Joi.string().email().required(),
	nom: Joi.string().required(),
	prénom: Joi.string().required(),
	téléphone: Joi.string().custom(validatePhone).required(),
	ville: Joi.string().required(), // Regex utilsée côté LEE
});

export function validatePhone(input: string): string {
	const { isValid, phoneNumber } = phone(input, { country: 'FR', validateMobilePrefix: false });
	if (!isValid) {
		throw Error('Le numéro de téléphone n‘est pas un numéro français valide');
	}
	return phoneNumber;
}
