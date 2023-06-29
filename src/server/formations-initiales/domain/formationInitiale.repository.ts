import { Either } from '../../errors/either';
import { FormationInitiale } from './formationInitiale';

export interface FormationInitialeRepository {
    search(): Promise<Either<Array<FormationInitiale>>>;
}

