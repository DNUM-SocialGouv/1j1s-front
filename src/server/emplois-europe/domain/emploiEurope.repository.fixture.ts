import { EmploiEuropeRepository } from '~/server/emplois-europe/domain/emploiEurope.repository';
import { createSuccess } from '~/server/errors/either';

export function aEmploiEuropeRepository(): EmploiEuropeRepository {
	return {
		search: jest.fn().mockResolvedValue(createSuccess(undefined)),
	};
}
