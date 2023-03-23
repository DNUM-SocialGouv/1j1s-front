import { createSuccess } from '~/server/errors/either';
import { FormationRepository } from '~/server/formations/domain/formation.repository';

export function aFormationRepository() {
	return {
		get: jest.fn().mockResolvedValue(createSuccess(undefined)),
	} as unknown as FormationRepository;
}
