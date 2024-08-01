import { CmsService } from '~/server/cms/domain/cmsService';
import { createSuccess, Either, isFailure } from '~/server/errors/either';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { ServiceJeune } from '~/server/services-jeunes/domain/servicesJeunes';
import { ServicesJeunesRepository } from '~/server/services-jeunes/domain/servicesJeunes.repository';
import { StrapiMesuresJeunes } from '~/server/services-jeunes/infra/strapiMesuresJeunes';
import {
	filterStrapiMesuresJeunes,
	mapToServicesJeunes,
} from '~/server/services-jeunes/infra/strapiServicesJeunes.service';

const RESOURCE_MESURE_JEUNE = 'mesure-jeune';

export class StrapiServicesJeunesRepository implements ServicesJeunesRepository {
	constructor(private readonly strapiService: CmsService, private readonly errorManagementService: ErrorManagementService) {
	}

	async getServicesJeunesList(): Promise<Either<Array<ServiceJeune>>> {
		const query = 'populate=deep';
		const strapiMesuresJeunes = await this.strapiService.getSingleType<StrapiMesuresJeunes.MesuresJeunesParCategorie>(RESOURCE_MESURE_JEUNE, query);

		if (isFailure(strapiMesuresJeunes))
			return strapiMesuresJeunes;

		try {
			const strapiMesuresJeunesFiltrees = filterStrapiMesuresJeunes(strapiMesuresJeunes.result);
			const servicesJeunes = mapToServicesJeunes(strapiMesuresJeunesFiltrees);
			servicesJeunes.sort((a, b) => a.titre.localeCompare(b.titre));
			return createSuccess(servicesJeunes);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'Strapi - Services Jeunes',
				contexte: 'récupérer les services jeunes',
				message: 'impossible de transformer vers les services jeunes',
			});
		}
	}
}
