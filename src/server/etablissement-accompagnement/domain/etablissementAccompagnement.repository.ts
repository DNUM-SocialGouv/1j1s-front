import { Either } from '~/server/errors/either';
import {
	EtablissementAccompagnement,
	ParametresRechercheEtablissementAccompagnement,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement';

export interface EtablissementAccompagnementRepository {
	search(params: ParametresRechercheEtablissementAccompagnement): Promise<Either<Array<EtablissementAccompagnement>>>
}
