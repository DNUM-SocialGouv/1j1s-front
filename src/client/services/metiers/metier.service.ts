import { Either } from '~/server/errors/either';
import { Metier } from '~/server/metiers/domain/metier';

export interface MetierService {
	rechercherMetier(query: string): Promise<Either<Metier[]>> ;
}
