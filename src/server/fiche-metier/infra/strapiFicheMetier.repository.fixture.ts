import { createSuccess } from '~/server/errors/either';
import { aFicheMetier, aListNomMetier } from '~/server/fiche-metier/domain/ficheMetier.fixture';
import { FicheMetierRepository } from '~/server/fiche-metier/domain/ficheMetier.repository';

export function aFicheMetierRepository(override?:Partial<FicheMetierRepository>): FicheMetierRepository {
	return {
		getAllNomsMetiers: jest.fn().mockResolvedValue(createSuccess(aListNomMetier())),
		getFicheMetierByNom: jest.fn().mockResolvedValue(createSuccess(aFicheMetier())),
		...override,
	};
}
