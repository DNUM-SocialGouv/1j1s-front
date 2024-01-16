import { createSuccess } from '~/server/errors/either';
import { aFicheMetier, aListNomMetier } from '~/server/fiche-metier/domain/ficheMetier.fixture';
import { StagesRepository } from '~/server/stages/domain/stages.repository';

export function aStagesRepository(override?: Partial<StagesRepository>): StagesRepository{
	return {
		getOffreDeStageBySlug: jest.fn().mockResolvedValue(createSuccess(aListNomMetier())),
		listAllOffreDeStageSlug: jest.fn().mockResolvedValue(createSuccess(aFicheMetier())),
		saveOffreDeStage: jest.fn().mockResolvedValue(createSuccess(undefined)),
		...override,
	};
}
