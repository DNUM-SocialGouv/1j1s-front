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

const DemandeDeContactCEJValidator = Joi.object({
	age: Joi.number().allow(16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30).custom(parseAge).required(),
	codeCommune: Joi.string().alphanum().length(5).required(),
	email: Joi.string().email().required(),
	nom: Joi.string().required(),
	nomCommune: Joi.string().required(),
	prénom: Joi.string().required(),
	téléphone: Joi.string().custom(validatePhone).required(),
});

export function validatePhone(input: string): string {
	const { isValid, phoneNumber } = phone(input, { country: 'FR', validateMobilePrefix: false });
	if (!isValid) {
		throw Error('Le numéro de téléphone n‘est pas un numéro français valide');
	}
	return phoneNumber;
}
