import Joi from 'joi';
import phone from 'phone';

import { DemandeDeContactCEJ } from '~/server/demande-de-contact/domain/demandeDeContact';
import { DemandeDeContactRepository } from '~/server/demande-de-contact/domain/demandeDeContact.repository';
import { createFailure, Either } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { emailRegex } from '~/shared/emailRegex';

export class EnvoyerDemandeDeContactCEJUseCase {
	constructor(private demandeDeContactRepository: DemandeDeContactRepository) {
	}

	async handle(command: Partial<DemandeDeContactCEJ>): Promise<Either<void>> {
		try {
			const demandeDeContactCEJ = Joi.attempt<Joi.Schema<DemandeDeContactCEJ>>(command, DemandeDeContactCEJValidator);
			return this.demandeDeContactRepository.envoyer(demandeDeContactCEJ);
		} catch (e) {
			return createFailure(ErreurMetier.DEMANDE_INCORRECTE);
		}
	}
}

export const DemandeDeContactCEJValidator = Joi.object({
	age: Joi.number().integer().min(16).max(30).required(),
	codePostal: Joi.string().pattern(/^((?:0[1-9]|[1-8]\d|9[0-5])\d{3}|(?:97[1-6]\d{2}))$/, 'code postal français').required(),
	email: Joi.string().pattern(new RegExp(emailRegex)).required(),
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
