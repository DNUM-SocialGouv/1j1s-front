import { CmsRepository } from '../../cms/domain/cms.repository';
import { createSuccess, Either, isFailure } from '../../errors/either';
import { ErrorManagementService } from '../../services/error/errorManagement.service';
import { MesureEmployeur } from '../domain/mesureEmployeur';
import { MesuresEmployeursRepository } from '../domain/mesuresEmployeurs.repository';
import { StrapiMesuresEmployeurs } from './strapiMesuresEmployeurs';
import { mapMesuresEmployeurs } from './strapiMesuresEmployeurs.mapper';

const RESOURCE_MESURES_EMPLOYEURS = 'les-mesures-employeurs';
export class StrapiMesuresEmployeursRepository implements MesuresEmployeursRepository {
	constructor(private readonly strapiService: CmsRepository, private readonly errorManagementService: ErrorManagementService) {
	}
	async getMesuresEmployeurs(): Promise<Either<Array<MesureEmployeur>>> {
		const query = 'populate=deep';
		try {
			const strapiMesuresEmployeurs = await this.strapiService.getSingleType<StrapiMesuresEmployeurs.MesuresEmployeurs>(RESOURCE_MESURES_EMPLOYEURS, query);
			if(isFailure(strapiMesuresEmployeurs)) return strapiMesuresEmployeurs;

			const mesuresEmployeurs = mapMesuresEmployeurs(strapiMesuresEmployeurs.result);
			return createSuccess(mesuresEmployeurs);

		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'Strapi - Mesures Employeurs',
				contexte: 'récupérer les mesures employeurs',
				message: 'impossible de mapper vers les mesures employeurs',
			});
		}
	}
}

