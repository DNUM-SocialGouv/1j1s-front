import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';
import { FormationInitialeDetailCMS } from '~/server/formations-initiales-detail/domain/formationInitiale.type';

export type FormationInitialeDetailComplete =  FormationInitiale | (FormationInitiale & FormationInitialeDetailCMS);

export function isFormationWithDetails(formation: FormationInitialeDetailComplete): formation is (FormationInitiale & FormationInitialeDetailCMS) {
	return 'dateDeMiseAJour' in formation;
}
