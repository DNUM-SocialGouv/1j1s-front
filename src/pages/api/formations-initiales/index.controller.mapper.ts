import { FormationInitialeQueryParams } from '~/client/hooks/useFormationInitialeQuery';
import { FormationInitialeFiltre } from '~/server/formations-initiales/domain/formationInitiale';

export function formationInitialeFiltreMapper(query: FormationInitialeQueryParams): FormationInitialeFiltre {
	return {
		motCle: query.motCle ? String(query.motCle) : '',
	};
}
