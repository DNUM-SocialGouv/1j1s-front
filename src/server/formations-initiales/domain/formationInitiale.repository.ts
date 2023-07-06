import { Either } from '~/server/errors/either';
import { FormationInitiale, FormationInitialeDetail, FormationInitialeFiltre } from '~/server/formations-initiales/domain/formationInitiale';

export interface FormationInitialeRepository {
    search(filtre: FormationInitialeFiltre): Promise<Either<Array<FormationInitiale>>>;
    getDetail(id: string): Promise<Either<FormationInitialeDetail>>
}

