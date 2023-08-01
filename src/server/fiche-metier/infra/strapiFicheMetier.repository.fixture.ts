import { createSuccess } from '~/server/errors/either';
import { aFicheMetier, aListAllFicheMetierNomMetier } from '~/server/fiche-metier/domain/ficheMetier.fixture';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';

export function aFicheMetierRepository(override?:Partial<FicheMetierRepository>): FicheMetierRepository {
	return {
		getFicheMetierByNom: jest.fn().mockResolvedValue(createSuccess(aFicheMetier())),
		listAllFicheMetierNomMetier: jest.fn().mockResolvedValue(createSuccess(aListAllFicheMetierNomMetier())),
		...override,
	};
}
