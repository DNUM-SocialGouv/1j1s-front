import { Either } from '~/server/errors/either';
import {
	ÉtablissementAccompagnement,
	ParamètresRechercheÉtablissementAccompagnement,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement';

export interface ÉtablissementAccompagnementRepository {
	search(params: ParamètresRechercheÉtablissementAccompagnement): Promise<Either<Array<ÉtablissementAccompagnement>>>
}
