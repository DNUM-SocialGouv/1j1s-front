import { Either } from '~/server/errors/either';

import { FormulaireDemandeDeContactCEJ } from './bff.demandeDeContact.service';

export interface DemandeDeContactService {
	envoyerPourLeCEJ(formulaire: FormulaireDemandeDeContactCEJ): Promise<Either<undefined>>
}
