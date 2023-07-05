import { Either } from '../../errors/either';
import { FormationInitiale, FormationInitialeFiltre } from './formationInitiale';

export interface FormationInitialeRepository {
    search(filtre: FormationInitialeFiltre): Promise<Either<Array<FormationInitiale>>>;
}

