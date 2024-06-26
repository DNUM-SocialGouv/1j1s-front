import { Either } from '~/server/errors/either';
import {
	FormationInitiale,
	FormationInitialeFiltre,
	ResultatRechercheFormationsInitiales,
} from '~/server/formations-initiales/domain/formationInitiale';

export interface FormationInitialeRepository {
	search(filtre: FormationInitialeFiltre): Promise<Either<ResultatRechercheFormationsInitiales>>;

	getFormationInitialeDetail(id: string): Promise<Either<FormationInitiale>>
}

