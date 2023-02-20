import { anUnorderedServiceJeuneList, aServiceJeune, aServiceJeuneList } from '~/server/cms/domain/espaceJeune.fixture';
import { ServiceJeune } from '~/server/cms/domain/serviceJeune';
import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { ListerServicesJeunesUseCase } from '~/server/cms/useCases/listerServicesJeunesUseCase';
import { createSuccess } from '~/server/errors/either';

describe('ListerServicesJeunesUseCase', () => {
	it('retourne la liste des services jeunes triée alphabétiquement dans le titre', async () => {
		const cmsRepository = aStrapiCmsRepository();
		cmsRepository.getServiceJeuneList = jest.fn().mockResolvedValue(createSuccess(anUnorderedServiceJeuneList()));
		const listerServicesJeunesUseCase = new ListerServicesJeunesUseCase(cmsRepository);

		const result = await listerServicesJeunesUseCase.handle();

		expect(result).toEqual(createSuccess(aServiceJeuneList()));
	});

	it('retourne la liste des services jeunes sans aides financières', async () => {
		const cmsRepository = aStrapiCmsRepository();
		cmsRepository.getServiceJeuneList = jest.fn().mockResolvedValue(createSuccess([aServiceJeune({ categorie: ServiceJeune.Categorie.AIDES_FINANCIERES })]));
		const listerServicesJeunesUseCase = new ListerServicesJeunesUseCase(cmsRepository);

		const result = await listerServicesJeunesUseCase.handle();

		expect(result).toEqual(createSuccess([]));
	});
});
