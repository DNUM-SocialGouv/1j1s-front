import { Stage3eEt2deFiltre } from '../domain/stage3eEt2de';
import { Stage3eEt2deRepository } from '../domain/stage3eEt2de.repository';

export class RechercherStage3eEt2deUseCase {
	constructor(private repository: Stage3eEt2deRepository) {}

	async handle(filtre: Stage3eEt2deFiltre) {
		return this.repository.search(filtre);
	}
}
