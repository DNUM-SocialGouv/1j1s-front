import { CmsService } from '../../cms/domain/cmsService';
import { createSuccess, Either, isFailure } from '../../errors/either';
import { ErrorManagementService } from '../../services/error/errorManagement.service';
import { MesureEmployeur } from '../domain/mesureEmployeur';
import { MesuresEmployeursRepository } from '../domain/mesuresEmployeurs.repository';
import { StrapiMesuresEmployeurs } from './strapiMesuresEmployeurs';
import { mapMesuresEmployeurs } from './strapiMesuresEmployeurs.mapper';

const RESOURCE_MESURES_EMPLOYEURS = 'les-mesures-employeurs';
export class StrapiMesuresEmployeursRepository implements MesuresEmployeursRepository {
	constructor(private readonly strapiService: CmsService, private readonly errorManagementService: ErrorManagementService) {
	}
	async getMesuresEmployeurs(): Promise<Either<Array<MesureEmployeur>>> {
		const query = 'populate=deep';
		try {
			const strapiMesuresEmployeurs = await this.strapiService.getSingleType<StrapiMesuresEmployeurs.MesuresEmployeurs>(RESOURCE_MESURES_EMPLOYEURS, query);
			if(isFailure(strapiMesuresEmployeurs)) return strapiMesuresEmployeurs;

			const strapiMesuresEmployeursFiltrees = filterStrapiMesuresEmployeurs(strapiMesuresEmployeurs.result);
			const mesuresEmployeurs = mapMesuresEmployeurs(strapiMesuresEmployeursFiltrees);
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

function filterStrapiMesuresEmployeurs(strapiMesuresEmployeurs: StrapiMesuresEmployeurs.MesuresEmployeurs): StrapiMesuresEmployeurs.MesuresEmployeurs {
	return {
		dispositifs: strapiMesuresEmployeurs.dispositifs.filter(contientUnLink),
	};
}

function contientUnLink(mesure: StrapiMesuresEmployeurs.Dispositif): boolean {
	return Boolean(mesure.article?.data || mesure.url);
}
