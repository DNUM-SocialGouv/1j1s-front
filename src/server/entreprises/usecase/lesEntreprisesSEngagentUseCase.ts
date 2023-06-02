import Joi from 'joi';
import phone from 'phone';

import { StrapiRepository } from '~/server/cms/infra/repositories/strapi.repository';
import { createFailure, createSuccess, Either, isFailure, isSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

import { Entreprise, SecteurDActivité, TailleDEntreprise } from '../domain/Entreprise';
import { RejoindreLaMobilisationRepository } from '../domain/RejoindreLaMobilisation.repository';

export class LesEntreprisesSEngagentUseCase {
	constructor(
    private primaryRepository: RejoindreLaMobilisationRepository,
    private secondaryRepository: StrapiRepository,
	) {}

	async rejoindreLaMobilisation(command: RejoindreLaMobilisation): Promise<Either<void>> {
		let entreprise: Entreprise;
		try {
			entreprise = Joi.attempt(command, EntrepriseValidator);
		} catch (e) {
			return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
		}
		const primarySave = await this.primaryRepository.save(entreprise);
		if (isFailure(primarySave)) {
			if (isSuccess(await this.secondaryRepository.saveEntrepriseRejoindreLaMobilisation(entreprise, primarySave.errorType))) {
				return createSuccess(undefined);
			} else {
				return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
			}
		}
		return primarySave;
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
		throw Error('Le numéro de téléphone n‘est pas un numéro français valide');
	}
	return phoneNumber;
}
