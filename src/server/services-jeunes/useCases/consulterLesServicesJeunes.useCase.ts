import { Either } from '~/server/errors/either';

import { ServiceJeune } from '../domain/servicesJeunes';
import { ServicesJeunesRepository } from '../domain/servicesJeunes.repository';

export class ConsulterLesServicesJeunesUseCase {
	constructor(private servicesJeunesRepository: ServicesJeunesRepository) {
	}

	async handle(): Promise<Either<Array<ServiceJeune>>> {
		return this.servicesJeunesRepository.getServicesJeunesList();
	}
}
