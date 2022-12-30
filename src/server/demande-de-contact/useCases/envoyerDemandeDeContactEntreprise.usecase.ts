import Joi from 'joi';
import phone from 'phone';

import { DemandeDeContactEntreprise } from '~/server/demande-de-contact/domain/demandeDeContact';
import { DemandeDeContactRepository } from '~/server/demande-de-contact/domain/demandeDeContact.repository';
import { createFailure, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

export class EnvoyerDemandeDeContactEntrepriseUseCase {
	constructor(private demandeDeContactRepository: DemandeDeContactRepository) {}

	async handle(command: Partial<DemandeDeContactEntreprise>): Promise<Either<void>> {
		try {
			const demandeDeContactEntreprise: DemandeDeContactEntreprise = Joi.attempt(command, DemandeDeContactEntrepriseValidator);
			return this.demandeDeContactRepository.envoyer(demandeDeContactEntreprise);
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
		throw Error('Le numéro de téléphone n‘est pas un numéro français valide');
	}
	return phoneNumber;
}
