import { CandidatureStage3eEt2de } from '../domain/candidatureStage3eEt2de';
import { Stage3eEt2deRepository } from '../domain/stage3eEt2de.repository';

export class EnvoyerCandidatureStage3eEt2deUseCase {
	constructor(private stage3eEt2deRepository: Stage3eEt2deRepository) {}
	
	async handle(candidature: CandidatureStage3eEt2de) {
		return this.stage3eEt2deRepository.sendCandidatureStage3eEt2de(candidature);
	}
}
