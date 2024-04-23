import { Either } from '~/server/errors/either';
import { RésultatRechercheFormation } from '~/server/formations/domain/formation';

import { FormationQueryParams } from '../../hooks/useFormationQuery';

export interface FormationService {
	rechercherFormation(query: FormationQueryParams): Promise<Either<Array<RésultatRechercheFormation>>>
}
