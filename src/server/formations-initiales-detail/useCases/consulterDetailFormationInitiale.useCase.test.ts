import { aFormationInitialeDetailCMS } from '~/server/cms/domain/formationInitiale.fixture';
import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createFailure, createSuccess, Failure, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { aFormationInitialeDetail } from '~/server/formations-initiales/domain/formationInitiale.fixture';
import {
	anOnisepFormationInitialeRepository,
} from '~/server/formations-initiales/infra/onisepFormationInitiale.repository.fixture';
import { FormationInitialeDetailComplete } from '~/server/formations-initiales-detail/domain/formationInitiale';
import {
	aFormationInitialeDetailComplete,
} from '~/server/formations-initiales-detail/domain/formationInitiale.fixture';
import {
	ConsulterDetailFormationInitialeUseCase,
} from '~/server/formations-initiales-detail/useCases/consulterDetailFormationInitiale.useCase';

describe('consulterDetailFormationInitiale', () => {
	it('appelle les repositories avec les bons arguments', async () => {
		const id = 'FOR.1234';
		const formationInitialeRepository = anOnisepFormationInitialeRepository({ getDetail: jest.fn() });
		const cmsRepository = aStrapiCmsRepository({ getFormationInitialeById: jest.fn() });
		jest.spyOn(formationInitialeRepository, 'getDetail').mockResolvedValue(createSuccess(aFormationInitialeDetail()));
		jest.spyOn(cmsRepository, 'getFormationInitialeById').mockResolvedValue(createSuccess(aFormationInitialeDetailCMS()));

		const consulterDetailFormationInitialeUseCase = await new ConsulterDetailFormationInitialeUseCase(formationInitialeRepository, cmsRepository);
		await consulterDetailFormationInitialeUseCase.handle(id);

		expect(formationInitialeRepository.getDetail).toHaveBeenCalledWith(id);
		expect(cmsRepository.getFormationInitialeById).toHaveBeenCalledWith(id);
	});
	it('renvoie le detail de la formation initiale complete', async () => {
		const id = 'FOR.1234';
		const formationInitialeRepository = anOnisepFormationInitialeRepository({ getDetail: jest.fn() });
		const cmsRepository = aStrapiCmsRepository({ getFormationInitialeById: jest.fn() });
		const expectedResult = aFormationInitialeDetailComplete();
		jest.spyOn(formationInitialeRepository, 'getDetail').mockResolvedValue(createSuccess(aFormationInitialeDetail()));
		jest.spyOn(cmsRepository, 'getFormationInitialeById').mockResolvedValue(createSuccess(aFormationInitialeDetailCMS()));

		const consulterDetailFormationInitialeUseCase = await new ConsulterDetailFormationInitialeUseCase(formationInitialeRepository, cmsRepository);

		const result = await consulterDetailFormationInitialeUseCase.handle(id);
		expect(result.instance).toEqual('success');
		expect((result as Success<FormationInitialeDetailComplete>).result).toMatchObject(expectedResult);
	});
	it('renvoie le detail de la formation initiale provenant de l‘onsiep si le cms est en erreur', async () => {
		const id = 'FOR.1234';
		const formationInitialeRepository = anOnisepFormationInitialeRepository({ getDetail: jest.fn() });
		const cmsRepository = aStrapiCmsRepository({ getFormationInitialeById: jest.fn() });
		const formationInitialeDetail = aFormationInitialeDetail();
		jest.spyOn(formationInitialeRepository, 'getDetail').mockResolvedValue(createSuccess(formationInitialeDetail));
		jest.spyOn(cmsRepository, 'getFormationInitialeById').mockResolvedValue(createFailure(ErreurMétier.DEMANDE_INCORRECTE));

		const consulterDetailFormationInitialeUseCase = await new ConsulterDetailFormationInitialeUseCase(formationInitialeRepository, cmsRepository);

		const result = await consulterDetailFormationInitialeUseCase.handle(id);
		expect(result.instance).toEqual('success');
		expect((result as Success<FormationInitialeDetailComplete>).result).toMatchObject(formationInitialeDetail);
	});
	it('renvoie une erreur si le detail de la formation initiale provenant de l‘onisep est en erreur', async () => {
		const id = 'FOR.1234';
		const formationInitialeRepository = anOnisepFormationInitialeRepository({ getDetail: jest.fn() });
		const cmsRepository = aStrapiCmsRepository({ getFormationInitialeById: jest.fn() });
		const expectedFailure = ErreurMétier.DEMANDE_INCORRECTE;
		jest.spyOn(formationInitialeRepository, 'getDetail').mockResolvedValue(createFailure(expectedFailure));
		jest.spyOn(cmsRepository, 'getFormationInitialeById').mockResolvedValue(createSuccess(aFormationInitialeDetailCMS()));

		const consulterDetailFormationInitialeUseCase = await new ConsulterDetailFormationInitialeUseCase(formationInitialeRepository, cmsRepository);

		const result = await consulterDetailFormationInitialeUseCase.handle(id);
		expect(result.instance).toEqual('failure');
		expect((result as Failure).errorType).toEqual(expectedFailure);
	});
});
