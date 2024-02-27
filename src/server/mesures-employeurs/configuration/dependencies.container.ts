import { StrapiMesuresEmployeursRepository } from '../infra/strapiMesuresEmployeurs.repository';
import { ConsulterMesuresEmployeursUseCase } from '../useCases/consulterMesuresEmployeurs.useCase';

export interface MesuresEmployeursDependencies {
	consulterMesuresEmployeursUseCase: ConsulterMesuresEmployeursUseCase
}

export function mesuresEmployeursDependenciesContainer(mesuresEmployeursRepository: StrapiMesuresEmployeursRepository): MesuresEmployeursDependencies {
	return {
		consulterMesuresEmployeursUseCase: new ConsulterMesuresEmployeursUseCase(mesuresEmployeursRepository),
	};
}
