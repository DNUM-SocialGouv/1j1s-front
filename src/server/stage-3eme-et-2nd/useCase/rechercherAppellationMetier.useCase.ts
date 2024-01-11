import { MetierStage3emeEt2ndRepository } from '../domain/metierStage3emeEt2nd.repository';

export class RechercherAppellationMetierUseCase {
	constructor(private repository: MetierStage3emeEt2ndRepository) {}

	async handle(motCle: string) {
		return this.repository.search(motCle);
	}
}
