import { createSuccess } from '~/server/errors/either';
import { StatistiqueRepository } from '~/server/formations/domain/statistique.repository';

export function aStatistiqueRepository() {
	return {
		get: jest.fn().mockResolvedValue(createSuccess(undefined)),
	} as unknown as StatistiqueRepository;
}
