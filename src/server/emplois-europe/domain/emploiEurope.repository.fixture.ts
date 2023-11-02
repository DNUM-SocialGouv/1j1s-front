import { EmploiEuropeRepository } from '~/server/emplois-europe/domain/emploiEurope.repository';
import { createSuccess } from '~/server/errors/either';

export function anEmploiEuropeRepository(): EmploiEuropeRepository {
	return {
		get: jest.fn().mockResolvedValue(createSuccess(undefined)),
		search: jest.fn().mockResolvedValue(createSuccess(undefined)),
	};
}
