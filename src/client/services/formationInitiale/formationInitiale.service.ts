import { FormationInitialeQueryParams } from '~/client/hooks/useFormationInitialeQuery';
import { createSuccess, Either } from '~/server/errors/either';
import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';

export interface FormationInitialeInterface {
	rechercherFormationInitiale(query: FormationInitialeQueryParams): Promise<Either<Array<FormationInitiale>>>
}

export class FormationInitialeService implements FormationInitialeInterface {
	async rechercherFormationInitiale(query: FormationInitialeQueryParams): Promise<Either<Array<FormationInitiale>>> {
		return createSuccess([
			{
				libelle: 'Formation numero 1!!!',
			},
			{
				libelle: 'Formation numero 2!!!',
			},
		]);
	}
}
