import { FormationService } from '~/client/services/formation/formation.service';
import { createSuccess } from '~/server/errors/either';
import { Formation, NiveauRequis } from '~/server/formations/domain/formation';

export const aRésultatFormation = (): Array<Formation> => [
	{
		adresse: '1 rue de la République',
		nomEntreprise: 'La Bonne Alternance',
		tags: ['Paris', NiveauRequis['NIVEAU_5']],
		titre: 'Développeur web',
	},
];

export function aFormationService(
	rechercherFormationValue = aRésultatFormation(),
): FormationService {
	return {
		rechercherFormation: jest.fn().mockResolvedValue(createSuccess(rechercherFormationValue)),
	} as unknown as FormationService;
}
