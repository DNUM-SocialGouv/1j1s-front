import { createSuccess, Either } from '../../errors/either';
import {
	FormationInitiale,
	ResultatRechercheFormationsInitiales,
} from '../domain/formationInitiale';
import {
	aFormationInitiale,
	aResultatFormationInitiale,
} from '../domain/formationInitiale.fixture';
import { FormationInitialeRepository } from '../domain/formationInitiale.repository';

export function anOnisepFormationInitialeRepository(override?: Partial<FormationInitialeRepository>): FormationInitialeRepository{
	return {
		getDetail(): Promise<Either<FormationInitiale>> {
			return Promise.resolve(createSuccess(aFormationInitiale()));
		},
		search(): Promise<Either<ResultatRechercheFormationsInitiales>> {
			return Promise.resolve(createSuccess(aResultatFormationInitiale()));
		},
		...override,
	};
}
