import { Stage3emeRepository } from '../domain/stage3eme.repository';

export class RechercherStage3emeUseCase {
	constructor(private repository: Stage3emeRepository) {}

	async handle() {
		return this.repository.search();
	}
}
