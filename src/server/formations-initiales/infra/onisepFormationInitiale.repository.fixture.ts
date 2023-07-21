import { createSuccess, Either } from '../../errors/either';
import {
	FormationInitialeDetail,
	ResultatRechercheFormationsInitiales,
} from '../domain/formationInitiale';
import { aFormationInitialeDetail, aResultatFormationInitiale } from '../domain/formationInitiale.fixture';
import { FormationInitialeRepository } from '../domain/formationInitiale.repository';

export function anOnisepFormationInitialeRepository(override?: Partial<FormationInitialeRepository>): FormationInitialeRepository{
	return {
		getDetail(): Promise<Either<FormationInitialeDetail>> {
			return Promise.resolve(createSuccess(aFormationInitialeDetail()));
		},
		search(): Promise<Either<ResultatRechercheFormationsInitiales>> {
			return Promise.resolve(createSuccess(aResultatFormationInitiale()));
		},
		...override,
	};
}
