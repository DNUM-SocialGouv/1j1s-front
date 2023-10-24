import { createFailure, createSuccess, Failure, Success } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aFormationInitiale } from '~/server/formations-initiales/domain/formationInitiale.fixture';
import {
	anOnisepFormationInitialeRepository,
} from '~/server/formations-initiales/infra/onisepFormationInitiale.repository.fixture';
import { FormationInitialeDetailComplete } from '~/server/formations-initiales-detail/domain/formationInitiale';
import {
	aFormationInitialeDetailCMS,
	aFormationInitialeDetailComplete,
} from '~/server/formations-initiales-detail/domain/formationInitiale.fixture';
import {
	aStrapiFormationInitialeDetailRepository,
} from '~/server/formations-initiales-detail/infra/strapiFormationInitialeDetail.repository.fixture';
import {
	ConsulterDetailFormationInitialeUseCase,
} from '~/server/formations-initiales-detail/useCases/consulterDetailFormationInitiale.useCase';

describe('consulterDetailFormationInitiale', () => {
	it('appelle les repositories avec les bons arguments', async () => {
		const id = 'FOR.1234';
		const formationInitialeRepository = anOnisepFormationInitialeRepository({ getFormationInitiale: jest.fn() });
		const formationInitialDetailRepository = aStrapiFormationInitialeDetailRepository();
		jest.spyOn(formationInitialeRepository, 'getFormationInitiale').mockResolvedValue(createSuccess(aFormationInitiale()));
		jest.spyOn(formationInitialDetailRepository, 'getFormationInitialeById').mockResolvedValue(createSuccess(aFormationInitialeDetailCMS()));

		const consulterDetailFormationInitialeUseCase = await new ConsulterDetailFormationInitialeUseCase(formationInitialeRepository, formationInitialDetailRepository);
		await consulterDetailFormationInitialeUseCase.handle(id);

		expect(formationInitialeRepository.getFormationInitiale).toHaveBeenCalledWith(id);
		expect(formationInitialDetailRepository.getFormationInitialeById).toHaveBeenCalledWith(id);
	});
	it('renvoie le detail de la formation initiale complete', async () => {
		const id = 'FOR.1234';
		const formationInitialeRepository = anOnisepFormationInitialeRepository({ getFormationInitiale: jest.fn() });
		const formationInitialDetailRepository = aStrapiFormationInitialeDetailRepository();
		const expectedResult = aFormationInitialeDetailComplete();
		jest.spyOn(formationInitialeRepository, 'getFormationInitiale').mockResolvedValue(createSuccess(aFormationInitiale()));
		jest.spyOn(formationInitialDetailRepository, 'getFormationInitialeById').mockResolvedValue(createSuccess(aFormationInitialeDetailCMS()));

		const consulterDetailFormationInitialeUseCase = await new ConsulterDetailFormationInitialeUseCase(formationInitialeRepository, formationInitialDetailRepository);

		const result = await consulterDetailFormationInitialeUseCase.handle(id);
		expect(result.instance).toEqual('success');
		expect((result as Success<FormationInitialeDetailComplete>).result).toMatchObject(expectedResult);
	});
	it('renvoie le detail de la formation initiale provenant de l‘onsiep si le cms est en erreur', async () => {
		const id = 'FOR.1234';
		const formationInitialeRepository = anOnisepFormationInitialeRepository({ getFormationInitiale: jest.fn() });
		const formationInitialDetailRepository = aStrapiFormationInitialeDetailRepository();
		const formationInitialeDetail = aFormationInitiale();
		jest.spyOn(formationInitialeRepository, 'getFormationInitiale').mockResolvedValue(createSuccess(formationInitialeDetail));
		jest.spyOn(formationInitialDetailRepository, 'getFormationInitialeById').mockResolvedValue(createFailure(ErreurMetier.DEMANDE_INCORRECTE));

		const consulterDetailFormationInitialeUseCase = await new ConsulterDetailFormationInitialeUseCase(formationInitialeRepository, formationInitialDetailRepository);

		const result = await consulterDetailFormationInitialeUseCase.handle(id);
		expect(result.instance).toEqual('success');
		expect((result as Success<FormationInitialeDetailComplete>).result).toMatchObject(formationInitialeDetail);
	});
	it('renvoie une erreur si le detail de la formation initiale provenant de l‘onisep est en erreur', async () => {
		const id = 'FOR.1234';
		const formationInitialeRepository = anOnisepFormationInitialeRepository({ getFormationInitiale: jest.fn() });
		const formationInitialDetailRepository = aStrapiFormationInitialeDetailRepository();
		const expectedFailure = ErreurMetier.DEMANDE_INCORRECTE;
		jest.spyOn(formationInitialeRepository, 'getFormationInitiale').mockResolvedValue(createFailure(expectedFailure));
		jest.spyOn(formationInitialDetailRepository, 'getFormationInitialeById').mockResolvedValue(createSuccess(aFormationInitialeDetailCMS()));

		const consulterDetailFormationInitialeUseCase = await new ConsulterDetailFormationInitialeUseCase(formationInitialeRepository, formationInitialDetailRepository);

		const result = await consulterDetailFormationInitialeUseCase.handle(id);
		expect(result.instance).toEqual('failure');
		expect((result as Failure).errorType).toEqual(expectedFailure);
	});
});
