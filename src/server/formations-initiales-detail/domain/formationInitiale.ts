import { FormationInitialeDetailCMS } from '~/server/cms/domain/formationInitiale.type';
import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';

export type FormationInitialeDetailComplete =  FormationInitiale | (FormationInitiale & FormationInitialeDetailCMS);

export function isFormationWithDetails(formation: FormationInitialeDetailComplete): formation is (FormationInitiale & FormationInitialeDetailCMS) {
	return 'dateDeMiseAJour' in formation;
}
