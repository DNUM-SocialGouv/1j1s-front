import { MentionObligatoireRepository } from '../domain/mentionObligatoire.repository';
import { ConsulterMentionObligatoireUseCase } from '../useCases/consulterMentionObligatoire.useCase';

export interface MentionObligatoireDependencies {
	consulterMentionObligatoireUseCase: ConsulterMentionObligatoireUseCase
}

export function mentionObligatoireDependenciesContainer(mentionObligatoireRepository: MentionObligatoireRepository): MentionObligatoireDependencies {
	return {
		consulterMentionObligatoireUseCase: new ConsulterMentionObligatoireUseCase(mentionObligatoireRepository),
	};
}
