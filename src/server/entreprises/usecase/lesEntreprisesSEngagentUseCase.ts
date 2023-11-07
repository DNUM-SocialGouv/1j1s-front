import Joi from 'joi';
import phone from 'phone';

import { createFailure, Either } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { emailRegex } from '~/shared/emailRegex';

import { Entreprise, SecteurDActivité, TailleDEntreprise } from '../domain/Entreprise';
import { RejoindreLaMobilisationRepository } from '../domain/RejoindreLaMobilisation.repository';

export class LesEntreprisesSEngagentUseCase {
	constructor(
    private lEERepository: RejoindreLaMobilisationRepository,
	) {}

	async rejoindreLaMobilisation(command: RejoindreLaMobilisation): Promise<Either<void>> {
		let entreprise: Entreprise;

		try {
			entreprise = Joi.attempt(command, EntrepriseValidator);
		} catch (e) {
			return createFailure(ErreurMetier.DEMANDE_INCORRECTE);
		}

		const result = await this.lEERepository.save(entreprise);

		return result;
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
	codePostal: Joi.string().pattern(/^((?:0[1-9]|[1-8]\d|9[0-5])\d{3}|(?:97[1-6]\d{2}))$/, 'code postal français').required(), // Regex utilsée côté LEE
	email: Joi.string().pattern(new RegExp(emailRegex)).required(),
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
		throw Error('Le numéro de téléphone n‘est pas un numéro français valide');
	}
	return phoneNumber;
}
