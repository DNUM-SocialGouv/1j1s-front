import { createSuccess } from '~/server/errors/either';
import { FormationRepository } from '~/server/formations/domain/formation.repository';

export function aFormationRepository(): FormationRepository {
	return {
		get: jest.fn().mockResolvedValue(createSuccess(undefined)),
		search: jest.fn().mockResolvedValue(createSuccess(undefined)),
	};
}
