import { EmploiEuropeRepository } from '~/server/emplois-europe/domain/emploiEurope.repository';
import { createSuccess } from '~/server/errors/either';

export function anEmploiEuropeRepository(): EmploiEuropeRepository {
	return {
		get: vi.fn().mockResolvedValue(createSuccess(undefined)),
		search: vi.fn().mockResolvedValue(createSuccess(undefined)),
	};
}
