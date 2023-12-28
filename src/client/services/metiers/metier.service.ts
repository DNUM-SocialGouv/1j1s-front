import { MetierOption } from '~/client/components/ui/Form/Combobox/ComboboxMetiers/MetierOption';
import { Either } from '~/server/errors/either';

export interface MetierService {
	rechercherMetier(query: string): Promise<Either<MetierOption[]>> ;
}
