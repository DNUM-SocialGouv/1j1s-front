import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { createSuccess, Either, isFailure } from '~/server/errors/either';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';
import { ServiceJeune } from '~/server/services-jeunes/domain/servicesJeunes';
import { ServicesJeunesRepository } from '~/server/services-jeunes/domain/servicesJeunes.repository';
import { StrapiMesuresJeunes } from '~/server/services-jeunes/infra/strapiMesuresJeunes';
import { mapToServicesJeunes } from '~/server/services-jeunes/infra/strapiServicesJeunes.mapper';

const RESOURCE_MESURE_JEUNE = 'mesure-jeune';

export class StrapiServicesJeunesRepository implements ServicesJeunesRepository {
	constructor(private readonly strapiService: CmsRepository, private readonly errorManagementService: ErrorManagementService) {
	}

	async getServicesJeunesList(): Promise<Either<Array<ServiceJeune>>> {
		const query = 'populate=deep';
		const strapiMesuresJeunes = await this.strapiService.getSingleType<StrapiMesuresJeunes.MesuresJeunesParCategorie>(RESOURCE_MESURE_JEUNE, query);

		if (isFailure(strapiMesuresJeunes))
			return strapiMesuresJeunes;

		try {
			let servicesJeunes = mapToServicesJeunes(strapiMesuresJeunes.result);
			servicesJeunes = servicesJeunes.filter((serviceJeune) => serviceJeune.categorie !== ServiceJeune.Categorie.AIDES_FINANCIERES);
			servicesJeunes.sort((a, b) => a.titre.localeCompare(b.titre));
			return createSuccess(servicesJeunes);
		} catch (error) {
			return this.errorManagementService.handleFailureError(error, {
				apiSource: 'Strapi - Services Jeunes',
				contexte: 'récupérer les services jeunes',
				message: 'impossible de mapper vers les services jeunes',
			});
		}
	}
}

