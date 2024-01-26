import { MetierStage3eEt2deRepository } from '../domain/metierStage3eEt2de.repository';

export class RecupererMetiersParAppellationCodesUseCase {
	constructor(private repository: MetierStage3eEt2deRepository) {}

	async handle(appellationCodes: string[]) {
		return this.repository.getMetiersByAppellationCodes(appellationCodes);
	}
}
