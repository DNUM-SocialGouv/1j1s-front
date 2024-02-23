import { Either } from '~/server/errors/either';
import {
	EtablissementAccompagnement,
	ParametresRechercheEtablissementAccompagnement,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement';
import {
	EtablissementAccompagnementRepository,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement.repository';

export class RechercherEtablissementAccompagnementUseCase {
	constructor(private etablissementAccompagnementRepository: EtablissementAccompagnementRepository) {}

	async handle(params: ParametresRechercheEtablissementAccompagnement): Promise<Either<Array<EtablissementAccompagnement>>> {
		return this.etablissementAccompagnementRepository.search(params);
	}
}
