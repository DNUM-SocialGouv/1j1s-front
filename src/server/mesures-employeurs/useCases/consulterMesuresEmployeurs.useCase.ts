import { Either } from '~/server/errors/either';

import { MesureEmployeur } from '../domain/mesureEmployeur';
import { MesuresEmployeursRepository } from '../domain/mesuresEmployeurs.repository';

export class ConsulterMesuresEmployeursUseCase {
	constructor(private mesuresEmployeursRepository: MesuresEmployeursRepository) {}

	async handle(): Promise<Either<MesureEmployeur[]>> {
		return this.mesuresEmployeursRepository.getMesuresEmployeurs();
	}
}

