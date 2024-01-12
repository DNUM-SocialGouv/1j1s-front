import { MetierStage3eEt2deRepository } from '../domain/metierStage3eEt2de.repository';

export class RechercherAppellationMetierUseCase {
	constructor(private repository: MetierStage3eEt2deRepository) {}

	async handle(motCle: string) {
		return this.repository.search(motCle);
	}
}
