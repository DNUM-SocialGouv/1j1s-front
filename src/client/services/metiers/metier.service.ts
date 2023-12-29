import { Metier } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/Metier';
import { Either } from '~/server/errors/either';

export interface MetierService {
	rechercherMetier(query: string): Promise<Either<Metier[]>> ;
}
