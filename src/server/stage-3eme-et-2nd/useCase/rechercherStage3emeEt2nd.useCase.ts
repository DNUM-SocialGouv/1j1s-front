import { Stage3emeEt2ndFiltre } from '../domain/stage3emeEt2nd';
import { Stage3emeEt2ndRepository } from '../domain/stage3emeEt2nd.repository';

export class RechercherStage3emeEt2ndUseCase {
	constructor(private repository: Stage3emeEt2ndRepository) {}

	async handle(filtre: Stage3emeEt2ndFiltre) {
		return this.repository.search(filtre);
	}
}
