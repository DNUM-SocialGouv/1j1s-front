import { FormationService } from '~/client/services/formation/formation.service';
import { createSuccess } from '~/server/errors/either';
import { NiveauRequis, RésultatRechercheFormation } from '~/server/formations/domain/formation';

export const aRésultatFormation = (): Array<RésultatRechercheFormation> => [
	{
		adresse: '1 rue de la République',
		id: '123',
		nomEntreprise: 'La Bonne Alternance',
		tags: ['Paris', NiveauRequis['NIVEAU_5']],
		titre: 'Développeur web',
	},
];

export function aFormationService(rechercherFormationValue = aRésultatFormation()): FormationService {
	return {
		rechercherFormation: jest.fn().mockResolvedValue(createSuccess(rechercherFormationValue)),
	};
}
