import { aFormationInitiale } from '~/server/formations-initiales/domain/formationInitiale.fixture';
import { FormationInitialeDetailComplete } from '~/server/formations-initiales-detail/domain/formationInitiale';
import { FormationInitialeDetailCMS } from '~/server/formations-initiales-detail/domain/formationInitiale.type';

export function aFormationInitialeDetailComplete(override?: Partial<FormationInitialeDetailComplete>): FormationInitialeDetailComplete {
	return {
		...aFormationInitiale(),
		...aFormationInitialeDetailCMS(),
		...override,
	};
}

export function aFormationInitialeDetailCMS(override?: Partial<FormationInitialeDetailCMS>): FormationInitialeDetailCMS {
	return {
		attendusParcoursup: 'L‘option managament d‘unité de production culinaire vise à maîtriser des techniques culinaires propres aux différents types de restauration',
		conditionsAcces: 'Le diplomé peut débuter comme chef de partie, second de cuisine, avant d‘accéder à des postes d‘encadrement ou de direction.',
		dateDeMiseAJour: '2023-05-15T09:37:44.283Z',
		description: 'Je suis une description de formation initiale',
		poursuiteEtudes: 'Le BTS est un diplôme conçu pour une insertion professionnelle',
		...override,
	};
}
