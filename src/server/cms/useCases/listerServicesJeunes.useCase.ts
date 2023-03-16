import { CmsRepository } from '~/server/cms/domain/cms.repository';
import { ServiceJeune } from '~/server/cms/domain/serviceJeune';
import { Either, isSuccess } from '~/server/errors/either';

export class ListerServicesJeunesUseCase {
	constructor(private cmsRepository: CmsRepository) {}

	async handle(): Promise<Either<Array<ServiceJeune>>> {
		const serviceJeuneList = await this.cmsRepository.getServiceJeuneList();
		if (isSuccess(serviceJeuneList)) {
			serviceJeuneList.result = serviceJeuneList.result.filter((serviceJeune) => serviceJeune.categorie !== ServiceJeune.Categorie.AIDES_FINANCIERES);
			serviceJeuneList.result.sort((a, b) => a.titre.localeCompare(b.titre));
		}
		return serviceJeuneList;
	}
}
