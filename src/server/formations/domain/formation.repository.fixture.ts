import { createSuccess } from '~/server/errors/either';
import { FormationRepository } from '~/server/formations/domain/formation.repository';

export function aFormationRepository(): FormationRepository {
	return {
		get: vi.fn().mockResolvedValue(createSuccess(undefined)),
		search: vi.fn().mockResolvedValue(createSuccess(undefined)),
	};
}
