import { StrapiFAQRepository } from '../infra/strapiFAQ.repository';
import { ConsulterFAQUseCase } from '../useCases/consultertFAQ.useCase';
import { ListerFAQUseCase } from '../useCases/listerFAQ.useCase';

export interface FAQDependencies {
	consulterFAQ: ConsulterFAQUseCase
	listerQuestionsFAQ: ListerFAQUseCase
}

export function FAQDependenciesContainer(FAQRepository: StrapiFAQRepository): FAQDependencies {
	return {
		consulterFAQ: new ConsulterFAQUseCase(FAQRepository),
		listerQuestionsFAQ: new ListerFAQUseCase(FAQRepository),
	};
}
