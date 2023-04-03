import { Either } from '~/server/errors/either';
import {
	ÉtablissementAccompagnement,
	ParamètresRechercheÉtablissementAccompagnement,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement';
import {
	ÉtablissementAccompagnementRepository,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement.repository';

export class RechercherÉtablissementAccompagnementUseCase {
	constructor(private établissementAccompagnementRepository: ÉtablissementAccompagnementRepository) {}

	async handle(params: ParamètresRechercheÉtablissementAccompagnement): Promise<Either<ÉtablissementAccompagnement[]>> {
		return this.établissementAccompagnementRepository.search(params);
	}
}
