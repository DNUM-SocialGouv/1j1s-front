import { Stage3emeFiltre } from '../domain/stage3eme';
import { Stage3emeRepository } from '../domain/stage3eme.repository';

export class RechercherStage3emeUseCase {
	constructor(private repository: Stage3emeRepository) {}

	async handle(filtre: Stage3emeFiltre) {
		return this.repository.search(filtre);
	}
}
