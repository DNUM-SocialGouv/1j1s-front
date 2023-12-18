import { EntrepriseSouhaitantSEngager } from '~/pages/les-entreprises-s-engagent/inscription/index.page';
import { Entreprise } from '~/server/entreprises/domain/Entreprise';
import { createSuccess } from '~/server/errors/either';

import { LesEntreprisesSEngagentService } from './lesEntreprisesSEngagent.service';

export function aLesEntreprisesSEngagentService(): LesEntreprisesSEngagentService {
	return {
		envoyerFormulaireEngagement: jest.fn().mockResolvedValue(createSuccess(undefined)),
	} as unknown as LesEntreprisesSEngagentService;
}

export function anEntrepriseSouhaitantSEngager(overrides?: Partial<EntrepriseSouhaitantSEngager>): EntrepriseSouhaitantSEngager {
	return {
		codePostal: '75015',
		email: 'toto@email.com',
		nom: 'Tata',
		nomSociété: 'Octo',
		prénom: 'Toto',
		secteur: 'health-social',
		siret: '41816609600069',
		taille: 'xsmall',
		travail: 'RH',
		téléphone: '0122334455',
		ville: 'Paris 15e Arrondissement',
		...overrides,
	};
}

export function anEntreprise(overrides?: Partial<Entreprise>): Entreprise {
	return {
		codePostal: '75015',
		email: 'machin.chose@bidule.com',
		nom: 'Chose',
		nomSociété: 'Bidule co.',
		prénom: 'Machin',
		secteur: 'other-services',
		siret: '12345678901114',
		taille: 'medium',
		travail: 'Chef',
		téléphone: '+33123456789',
		ville: 'Paris (15e arrondissement)',
		...overrides,
	};
};

export const anEntrepriseMember = () => ({
	companyName: 'Bidule co.',
	companyPostalCode: '75015',
	companySector: 'other-services',
	companySiret: '12345678901114',
	companySize: 'medium',
	email: 'machin.chose@bidule.com',
	firstname: 'Machin',
	from1j1s: true,
	job: 'Chef',
	lastname: 'Chose',
	phone: '+33123456789',
});
