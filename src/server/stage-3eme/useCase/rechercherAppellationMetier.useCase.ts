import { MetierStage3emeRepository } from '../domain/metierStage3eme.repository';

export class RechercherAppellationMetierUseCase {
	constructor(private repository: MetierStage3emeRepository) {}

	async handle(motCle?: string) {
		return this.repository.search(motCle);
	}
}
