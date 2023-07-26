import { aFormationInitialeDetailCMS } from '~/server/cms/domain/formationInitiale.fixture';
import {
	aFormationInitiale,
} from '~/server/formations-initiales/domain/formationInitiale.fixture';
import { FormationInitialeDetailComplete } from '~/server/formations-initiales-detail/domain/formationInitiale';


export function aFormationInitialeDetailComplete(override?: Partial<FormationInitialeDetailComplete>): FormationInitialeDetailComplete {
	return {
		...aFormationInitiale(),
		...aFormationInitialeDetailCMS(),
		...override,
	};
}

