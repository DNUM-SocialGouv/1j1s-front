import { Either } from '~/server/errors/either';
import { ServiceJeune } from '~/server/services-jeunes/domain/servicesJeunes';

export interface ServicesJeunesRepository {
	getServicesJeunesList(): Promise<Either<Array<ServiceJeune>>>
}
