import { FormationInitialeDetailCMS } from '~/server/cms/domain/formationInitiale.type';

export function aFormationInitialeDetailCMS(override?: Partial<FormationInitialeDetailCMS>): FormationInitialeDetailCMS {
	return {
		attendusParcoursup: 'L‘option managament d‘unité de production culinaire vise à maîtriser des techniques culinaires propres aux différents types de restauration',
		conditionsAcces: 'Le diplomé peut débuter comme chef de partie, second de cuisine, avant d‘accéder à des postes d‘encadrement ou de direction.',
		description: 'Je suis une description de formation initiale',
		poursuiteEtudes: 'Le BTS est un diplôme conçu pour une insertion professionnelle',
		updatedAt: '2023-05-15T09:37:44.283Z',
		...override,
	};
}
