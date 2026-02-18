import { createSuccess } from '~/server/errors/either';
import { aFicheMetier, aListNomMetier } from '~/server/fiche-metier/domain/ficheMetier.fixture';
import { StagesRepository } from '~/server/stages/domain/stages.repository';

export function aStagesRepository(override?: Partial<StagesRepository>): StagesRepository{
	return {
		getOffreDeStageBySlug: vi.fn().mockResolvedValue(createSuccess(aListNomMetier())),
		listAllOffreDeStageSlug: vi.fn().mockResolvedValue(createSuccess(aFicheMetier())),
		saveOffreDeStage: vi.fn().mockResolvedValue(createSuccess(undefined)),
		...override,
	};
}
