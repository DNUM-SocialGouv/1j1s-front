import { FormationInitialeQueryParams } from '~/pages/api/formations-initiales/index.controller';
import { FormationInitialeFiltre } from '~/server/formations-initiales/domain/formationInitiale';

export function formationInitialeRechercheFiltreMapper(query: FormationInitialeQueryParams): FormationInitialeFiltre {
	return {
		motCle: query.motCle,
	};
}
